// 命令行模式
class Log {
    exec(name, ...arr) {
        let log = new Log();
        return log[name] && log[name](...arr);
    }

    info(text) {
        console.log(text);
    }

    error(text) {
        console.error(text);
    }
}

let log = new Log();
log.exec('error', '123');
