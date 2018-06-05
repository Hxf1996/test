function* filterIterator(iterator, fn) {
    let n = iterator.next();
    let i = 0;
    while (!n.done) {
        if (fn(n.value, i)) {
            yield n.value;
        }
        n = iterator.next();
        i++;
    }
}

function* mapIterator(iterator, fn) {
    let n = iterator.next();
    let i = 0;
    while (!n.done) {
        yield fn(n.value, i);
        n = iterator.next();
        i++;
    }
}


function* skipIterator(iterator) {
    let n = iterator.next();
    let i = 0;
    while (i < count && !n.done) {
        n = iterator.next();
        i++;
    }

    while (!n.done) {
        yield n.value;
        n = iterator.next();
    }
}

function* takeIterator(iterator) {
    let n = iterator.next();;
    let i = 0;
    while (i < count && !n.done) {
        yield n.value;
        n = iterator.next();
        i++;
    }
}

function patchIterator(iterator) {
    Object.defineProperties(iterator, {
        filter: {
            enumerable: false,
            writable: false,
            value(fn) {
                return patchIterator(filterIterator(this, fn));
            }
        },
        map: {
            enumerable: false,
            writable: false,
            value(fn) {
                return patchIterator(mapIterator(this, fn));
            }
        },
        skip: {
            enumerable: false,
            writable: false,
            value(count) {
                return patchIterator(skipIterator(this, count));
            }
        },
        take: {
            enumerable: false,
            writable: false,
            value(count) {
                return patchIterator(takeIterator(this, count));
            }
        },
        reduce: {
            enumerable: false,
            writable: false,
            value(fn, initValue) {
                let currentValue = initValue;
                let n = this.next();
                while (!n.done) {
                    currentValue = fn(currentValue, n.value);
                    n = this.next();
                }
                return currentValue;
            }
        },
        forEach: {
            enumerable: false,
            writable: false,
            value(fn) {
                let n = this.next();
                let i = 0;
                while (!n.done) {
                    fn(n.value, i++);
                    n = this.next();
                }
            }
        },
        every: {
            enumerable: false,
            writable: false,
            value(fn) {
                let n = this.next();
                let i = 0;
                let result = true;
                while (!n.done) {
                    result = fn(n.value, i++);
                    if (!result) {
                        break;
                    }
                    n = this.next();
                }
                return result;
            }
        },
        some: {
            enumerable: false,
            writable: false,
            value(fn) {
                let n = this.next();
                let i = 0;
                let result = false;
                while (!n.done) {
                    result = fn(n.value, i++);
                    if (result) {
                        break;
                    }
                    n = this.next();
                }
                return result;
            }
        },
        toArray: {
            enumerable: false,
            writable: false,
            value() {
                const array = [];
                let n = this.next();
                while (!n.done) {
                    array.push(n.value);
                    n = this.next();
                }
                return array;
            }
        }
    });
    return iterator;
}

function fromIterable(iterable) {
    return patchIterator(iterable[Symbol.iterator]())
}

const arr = [];
for (let i = 0; i< 2; i++) {
    arr.push(i);
}

const iterArr = fromIterable(arr);

// console.time();
// arr.map((item) => item+'h').filter((item) => item.length >= 2).filter((item) => item.length > 3).filter((item) => item.length > 4).filter((item) => item.length > 5);
// console.timeEnd();

console.time();
iterArr.map((item) => item+1).filter((item) => item>0).map((item) => item+1).toArray();
console.timeEnd();

// console.time()
// arr.map((item) => item+1).map((item) => item+1).map((item) => item+1);
// console.timeEnd();
