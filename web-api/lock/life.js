['pageshow', 'resume', 'freeze'].forEach((type) => {
    window.addEventListener(type, (e) => console.log(e.type), { capture: true });
});

window.addEventListener('beforeunload', (e) => {
    var confirmationMessage = "\o/";
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
}, { capture: true });

window.addEventListener('pagehide', (e) => {
    console.log(e);
}, { capture: true });
