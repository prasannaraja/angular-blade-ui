import { BehaviorSubject } from "rxjs";
import { BladeArgs } from "./blade-args";
import { BladeMetaData } from "./blade-meta-data";
import { BladeParam } from "./blade-param";
import { BladeState } from "./blade-state";

export class BladeContext {
    
    public get hasParams (): boolean {
        return this.params.length > 0;
    }
    public params: Array<BladeParam>;
    public isEntry = false;
    public isDirtySubject = new BehaviorSubject<boolean>(false);
    public isLoading = new BehaviorSubject<boolean>(false);

    public constructor(
        public parent: BladeContext,
        public id: string,
        public metaData: BladeMetaData,
        public state: BladeState,
        params?: Array<BladeParam>
    ) {
        if(params) {
            this.params = params;
        } else {
            this.params = new Array<BladeParam>();
        }
    }

    public toBaldeArgs(): BladeArgs {
        return { id: this.id, metaData: this.metaData };
    }
}