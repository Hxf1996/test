// 发布-订阅模式
class Pubsub {
    constructor() {
        this.uid = 0;
        this.topics = {};
    }

    publish(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }

        this.topics[topic].forEach((item) => {
            item.func(topic, args);
        })

        return this;
    }

    subscribe(topic, func) {
        this.topics[topic] = this.topics[topic] || [];
        let token = (++this.uid).toString();
        this.topics[topic].push({
            token: token,
            func: func
        });
        return token;
    }

    unSubscribe(token) {
    }
}

let pubsub = new Pubsub();

const messageLogger = function(topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

let loggerToken = pubsub.subscribe("log", messageLogger);
pubsub.publish("log", "hello world!");
