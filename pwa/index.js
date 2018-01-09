if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function(serviceWorkerRegistration) {
            console.log('Service Worker Registered');

            serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}).then(
                function(pushSubscription) {
                    console.log(pushSubscription.endpoint);
                },
                function(error) {
                    console.log(error);
                }
            );
        });
}
