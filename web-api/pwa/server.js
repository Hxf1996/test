const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:web-push-book@haorooms.com',
    'BFnnc0EQGvH7gAIxGxeVQHvrjc4YThbceoFm6ur5-N5HZ5uI--zTLXuQNVTMov_h7geRW49UD0HO8SvO-zBsBRo',
    'cxRDon1SwOwZSzaws_rWd05_3e6bQRhVehpZ27_xhmM'
);

const pushSubscription = JSON.parse('{"endpoint":"https://fcm.googleapis.com/fcm/send/dW0fzE3rf2M:APA91bGmlXZmwmuK1qdLSkAt-QXPXJDGVO45Br2aI7AbGd28O_8qf08pzsBo4CPSd4FDE5YdrmYUgL8Ldw4IqNeSBR3MMkGuZZwQyBDkZ-pK-8J1tMloC01dGZzTbYn6G3JajLEhWvxkfeM6e9_yGxvXEnDrxN_xvg","expirationTime":null,"keys":{"p256dh":"BHq_NUr5zjrFXLJozYa0p_Jq2YALoe86VYZxaOOSTDC2mueD5kHX2lVhzl3AR0GG2xKQVpHyCChj8Ry-dBtZ76U","auth":"V1pphebktcU9xvWEAkUTjQ"}}');

const payload = '123';

const options = {
    proxy: 'http://10.1.35.1:8080',
};

webpush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function (error) {
    console.log(error);
    process.exit(1);
});