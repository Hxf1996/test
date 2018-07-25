const key = 'BFnnc0EQGvH7gAIxGxeVQHvrjc4YThbceoFm6ur5-N5HZ5uI--zTLXuQNVTMov_h7geRW49UD0HO8SvO-zBsBRo';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js?v=1', { scope: '/' }).then((reg) => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
        reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8Array(key) }).then(
            function (pushSubscription) {
                console.log(JSON.stringify(pushSubscription.toJSON()));
                console.log(pushSubscription.endpoint);
            }, function (error) {
                console.log(error);
            }
        );
    }).catch(function (error) {
        console.log('Registration failed with ' + error);
    });
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}