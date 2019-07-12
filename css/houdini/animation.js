registerAnimator('ani', class ParallaxAnimator {
    constructor(options) {
        // console.log('options', options);
    }

    animate(currentTime, effect) {
        console.log(currentTime, effect);
        effect.localTime = currentTime;
    }
});
