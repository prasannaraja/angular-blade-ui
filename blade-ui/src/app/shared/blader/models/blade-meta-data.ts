import { Type } from "@angular/core";
import { BladeState } from "./blade-state";

export class BladeMetaData { 
    public isLazy = false;

    public constructor(
        public key: string,
        public component: Type<unknown>,
        public state?: BladeState,
        public factoryFn?: Function
    ) {
        this.isLazy = this.factoryFn !== undefined;
    }
}