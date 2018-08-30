const { Observable, AsyncSubject, interval, timer, combineLatest } = require('rxjs');
const { concatMap, take, map, combineAll, switchMap } = require('rxjs/operators')
require('rxjs/add/observable/of');

// const locations = new Observable((observer) => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);

//     setTimeout(() => {
//         observer.next(4);
//         observer.complete();
//     }, 1000);
// });

// console.log('just before subscribe');
// locations.subscribe({
//     next(position) { console.log('Current Position: ', position); },
//     error(msg) { console.log('Error Getting Location: ', msg); },
//     complete: () => console.log('done'),
// });
// console.log('just after subscribe');

// const a = Observable.of(1, 2, 3);

// const myObserver = {
//     next: x => console.log('Observer got a next value: ' + x),
//     error: err => console.error('Observer got an error: ' + err),
//     complete: () => console.log('Observer got a complete notification'),
// };

// a.subscribe(myObserver);

// const source = interval(1000).pipe(take(2));
// const example = source.pipe(
//     map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(3)))
// );
// const combined = example.pipe(combineAll());

// const subscribe = combined.subscribe(val => console.log(val));

// const timerOne = timer(1000, 4000);
// const timerTwo = timer(2000, 4000);
// const timerThree = timer(3000, 4000);
// const combined = combineLatest(timerOne, timerTwo, timerThree);

// const subscribe = combined.subscribe(latestValues => {
//     const [timerValOne, timerValTwo, timerValThree] = latestValues;
//     console.log(
//         `Timer One Latest: ${timerValOne},
//      Timer Two Latest: ${timerValTwo},
//      Timer Three Latest: ${timerValThree}`
//     );
// }
// );

const source = timer(0, 5000);
const example = source.pipe(switchMap(() => interval(500)));
const subscribe = example.subscribe(val => console.log(val));