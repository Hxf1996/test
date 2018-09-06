navigator.locks.request('my_resource1', async lock => {
    console.log(lock);

    await do_something();

    console.log(end);
});

function do_something() {
    return new Promise(() => { });
}
