// https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/
export default class Graph<T> {
    private edgeMap = new Map<T, T[]>();

    addEdge(from: T, to?: T) {
        let edge = this.edgeMap.get(from);
        if (!edge) {
            edge = [];
            this.edgeMap.set(from, edge);
        }
        if (to) {
            edge.push(to);
        }
    }

    sort(): T[] {
        const indegrees = new Map<T, number>();

        this.edgeMap.forEach((val, key) => {
            let indegree = indegrees.get(key);
            if (indegree === undefined) {
                indegrees.set(key, 0);
            }
            val.forEach(to => {
                let indegree = indegrees.get(to) || 0;
                indegrees.set(to, ++indegree);
            });
        });

        const size = indegrees.size;
        const queue: T[] = [];
        let firstRunner = true;
        let needRemove: T[] = [];
        while (firstRunner || needRemove.length > 0) {
            firstRunner = false;
            needRemove.forEach(to => {
                queue.push(to);
                indegrees.delete(to);
                const edge = this.edgeMap.get(to) || [];
                edge.forEach(from => {
                    const indegree = indegrees.get(from)!;
                    indegrees.set(from, indegree - 1);
                });
            });

            needRemove = [];
            indegrees.forEach((val, key) => {
                if (val === 0) {
                    needRemove.push(key)
                }
            });
        }

        if (queue.length !== size) {
            throw 'There exists a cycle in the graph';
        }

        return queue;
    }

    getDepended(to: T) {
        const result = this.edgeMap.get(to);
        return result ?? [];
    }
}
