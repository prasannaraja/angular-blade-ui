import { Type } from "@angular/core";
import { BladeMetaData } from "./models/blade-meta-data";
import { BladeState } from "./models/blade-state";

export class BladeRegistry {

    private _registry: Map<string, BladeMetaData> = new Map<
        string,
        BladeMetaData
        >();
    public register(
        key: string,
        component: Type<unknown>,
        state: BladeState
    ): void {
        const blade = new BladeMetaData(key, component, state);
        this._registry.set(blade.key, blade);
    }

    public exists(key: string): boolean {
        return this._registry.has(key);
    }

    public get(key: string): BladeMetaData {
        const item = this._registry.get(key);

        if (!item) {
            throw new Error(`BladeMetaData for key ${key} was not found!`);
        }

        return item;
    }

}