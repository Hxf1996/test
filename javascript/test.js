const napa = require('napajs');

function main(arr) {
    const temp = [];
    sort(arr, 0, arr.length - 1, temp);
}

function sort(arr, left, right, temp) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        sort(arr, left, mid, temp);
        sort(arr, mid + 1, right, temp);
        merge(arr, left, mid, right, temp);
    }
}

function merge(arr, left, mid, right, temp) {
    let i = left;
    let j = mid + 1;
    let t = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[t++] = arr[i++];
        } else {
            temp[t++] = arr[j++];
        }
    }
    while (i <= mid) {
        temp[t++] = arr[i++];
    }
    while (j <= right) {
        temp[t++] = arr[j++];
    }
    t = 0;
    while (left <= right) {
        arr[left++] = temp[t++];
    }
}

function test(arr, i) {
    const zone1 = napa.zone.create('zone1', { workers: 4 });
}

const arr1 = [];
const arr2 = [];
for (let index = 0; index < 100000; index++) {
    const number = Math.round(Math.random() * 100);
    arr1.push(number);
    arr2.push(number);
}
console.time();
main(arr1);
console.timeEnd();
