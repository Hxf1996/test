export type BaseEnv = Record<string | symbol, any>;
export interface PluginType {
    dependencies: PluginType[];
    (env: BaseEnv): void;
}
