import { PluginType, BaseEnv } from './Plugin';
import Graph from './Graph';

export default class System {
    private pluginGraph = new Graph<PluginType>();

    registerPlugin(pluginFunction: PluginType) {
        const dependencies = pluginFunction.dependencies;
        if (dependencies.length) {
            dependencies.forEach(item => {
                this.pluginGraph.addEdge(pluginFunction, item);
            });
        } else {
            this.pluginGraph.addEdge(pluginFunction);
        }

        return this;
    }

    run() {
        const envCaches = new Map<PluginType, BaseEnv>();
        const sortPlugins = this.pluginGraph.sort().reverse();

        sortPlugins.forEach(plugin => {
            const depended = this.pluginGraph.getDepended(plugin);
            let env: BaseEnv = {};
            depended.forEach(item => {
                const cacheEnv = envCaches.get(item);
                if (cacheEnv) {
                    Object.assign(env, cacheEnv);
                }
            });
            plugin(env);
            envCaches.set(plugin, env);
        });
    }
}
