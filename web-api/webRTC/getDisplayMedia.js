async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (err) {
        console.error("Error: " + err);
    }
    return captureStream;
}

const a = startCapture({
    audio: true,
    video: true,
});
a.then(data => {
    window.display = data;

    data.onactive = (...c) => {
        console.log('onactive', c);
    }
    data.onaddtrack = (...c) => {
        console.log('onaddtrack', c);
    }
    data.oninactive = (...c) => {
        console.log('oninactive', c);
    }
    data.onremovetrack = (...c) => {
        console.log('onremovetrack', c);
    }
})
