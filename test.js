const inquirer = require('inquirer');
const spawn = require('child_process').spawn;

// inquirer.prompt([
//     {
//         type: 'list',
//         name: 'testname',
//         message: 'testmessage',
//         choices: ["Choice A", new inquirer.Separator(), "choice B"],
//     },
//     {
//         type: 'list',
//         name: 'testname1',
//         message: 'testmessage1',
//         choices: ["Choice A1", new inquirer.Separator(), "choice B1"],
//     },
// ]).then((arr) => {
//     console.log(arr);
// });

var ui = new inquirer.ui.BottomBar();

ui.log.write('Almost over, standby!');

ui.updateBottomBar('new bottom bar content');

ui.log.write('something just happened.');

setTimeout(() => {
    ui.log.write('Almost over, standby!');
}, 1000);

// new Promise(() => { });

process.stdout.on('resize', () => {
    ui.log.write('窗口大小发生变化！');
    ui.log.write(`${process.stdout.columns}x${process.stdout.rows}`);
});
