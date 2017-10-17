// 单例模式
class Single {
    constructor() {
        if (!Single.__instance) {
            Single.__instance = this.init();
        };
        return Single.__instance;
    }

    init() {
        const privateMethod = function() {
            console.log("private fun");
        }
        const privateStr = "private str";

        return {
            getPrivateStr() {
                return privateStr;
            }
        };
    }
}

Single.__instance = null;

var singleA = new Single();
var singleB = new Single();

console.log(singleA === singleB);
