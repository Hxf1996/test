navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function (err) {
        console.log(err);
    });
