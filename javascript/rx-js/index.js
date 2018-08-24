const { Observable, AsyncSubject } = require('rxjs');
require('rxjs/add/observable/of');

const locations = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);

    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});

console.log('just before subscribe');
locations.subscribe({
    next(position) { console.log('Current Position: ', position); },
    error(msg) { console.log('Error Getting Location: ', msg); },
    complete: () => console.log('done'),
});
console.log('just after subscribe');
