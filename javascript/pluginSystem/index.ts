import { PluginType, BaseEnv } from './core/Plugin';
import System from './core/System';
import Koa from 'koa';

type EnvA = BaseEnv & {
    a: number;
    b: Koa;
};

const pluginA: PluginType = function (env: BaseEnv) {
    console.log('a');
    env.a = 1;
    const app = new Koa();
    app.use(ctx => {
        ctx.body = 'Hello Koa';
    });
    env.b = app;
}
pluginA.dependencies = [];

const pluginB: PluginType = function (env: EnvA) {
    console.log('b', env.a);
    env.b.listen(3000);
}
pluginB.dependencies = [pluginA];

const pluginC: PluginType = function (env: EnvA) {
    console.log('c', env.a);
}
pluginC.dependencies = [pluginB];

new System().registerPlugin(pluginB).registerPlugin(pluginC).run();
