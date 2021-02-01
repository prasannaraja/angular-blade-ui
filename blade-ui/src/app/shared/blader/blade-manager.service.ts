import { Injectable, OnDestroy } from "@angular/core";

@Injectable()
export class BladeManager implements OnDestroy {
    getParamValue<T>(id: string, key: string, checkAncestors: boolean, optional: boolean): T {
        throw new Error("Method not implemented.");
    }
    navigateTo(id: string, click: string) {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    
}