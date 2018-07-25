const key = 'BAf21skUYrehNsIHsF2V82tNjNBc_v0E0kyIqY5jYYz30uwwird4gQEvdi-7gWELwn9aThPDCFBTRSAnNKXmX5A';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDLr7s87AnFuiQT568vcSfK8hSyBJLGfBs",
    authDomain: "test-d0af8.firebaseapp.com",
    databaseURL: "https://test-d0af8.firebaseio.com",
    projectId: "test-d0af8",
    storageBucket: "test-d0af8.appspot.com",
    messagingSenderId: "421975750846"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js?v=1', { scope: '/' }).then((reg) => {
        messaging.useServiceWorker(reg);
        messaging.requestPermission().then(function () {
            messaging.usePublicVapidKey("BAf21skUYrehNsIHsF2V82tNjNBc_v0E0kyIqY5jYYz30uwwird4gQEvdi-7gWELwn9aThPDCFBTRSAnNKXmX5A");
            messaging.getToken().then(function (currentToken) {
                console.log(currentToken);
            });
        });
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