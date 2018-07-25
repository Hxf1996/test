const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:web-push-book@haorooms.com',
    'BAf21skUYrehNsIHsF2V82tNjNBc_v0E0kyIqY5jYYz30uwwird4gQEvdi-7gWELwn9aThPDCFBTRSAnNKXmX5A',
    'zru_N1Q7mCUVf0aHPEU1027Q9cqu6dBEl8SurvWvdg0'
);
webpush.setGCMAPIKey('dV-hAdDrEko:APA91bGe2RZS0UbA_vSwe0feGX0Df_XvsukF8AfwqvEzNM_qtNBiUXoVo1G-lZKok50fvzW6WqqeaaAe3rj4xeJb7fZ-TS2TH9IETnt1V6nDTYOjU1phxSVI1ewXrAB8ndvrZcoRjAOm');

const pushSubscription = JSON.parse('{"endpoint":"https://fcm.googleapis.com/fcm/send/fk0UqSRDT-E:APA91bFQM3CdOu1kPJ3rvIj6ncsGF66GKLsfo4C7PgWxpayauQOye9IA61PWZ4nGuJi3MrqhO_2GYsQX68ly7Mlr8b6TwXOFhotzxszNsKRafz2Kjkqpb344oqg0mhWnw_TwM6RvDkGoX9z03088Xjevn1doHapJ3Q","expirationTime":null,"keys":{"p256dh":"BFCr8e8Mu7j8E4gEqKlp3529y_WMC8qGZi3zrSDd2i7rdpwEWXJPN8CuGVRU4NnXfPtYE6WECt50xJGLubcn-yY","auth":"jZWiaHpsWvQDfwjhoTHnFA"}}');

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