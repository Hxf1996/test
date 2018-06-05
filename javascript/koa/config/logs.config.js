const path = require('path');

const dailyLogPath = path.resolve(__dirname, './daily/daily.log');

module.exports = {
    appenders: {
        daily: {
            type: 'dateFile',
            filename: dailyLogPath,
            pattern: '.yyyy-MM-dd',
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '[%d] [%p] %c - %m%n',
            },
        },
    },
    // 定义不同类型log的存储方式
    categories: {
        default: {
            appenders: ['daily'],
            level: 'info',
        },
    },
    // 重新调整log种类，颜色，优先级
    levels: {
        TRACE: {
            value: 5000,
            colour: 'blue',
        },
        DEBUG: {
            value: 10000,
            colour: 'cyan',
        },
        INFO: {
            value: 20000,
            colour: 'green',
        },
        WARN: {
            value: 30000,
            colour: 'yellow',
        },
        ERROR: {
            value: 40000,
            colour: 'red',
        },
        FATAL: {
            value: 50000,
            colour: 'magenta',
        },
        MARK: {
            value: 9007199254740992,
            colour: 'grey',
        },
    },
};
