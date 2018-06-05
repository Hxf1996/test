const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
    spinner.succeed('123');
    spinner.clear();
}, 1000);
