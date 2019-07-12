const div = document.getElementById('a');

const effect = new KeyframeEffect(div, [
    { transform: 'translateY(0%)' },
    { transform: 'translateY(100%)' },
], { duration: 3000, fill: 'forwards' });

const animation = new Animation(effect, document.timeline);

console.log(animation);

animation.play();
