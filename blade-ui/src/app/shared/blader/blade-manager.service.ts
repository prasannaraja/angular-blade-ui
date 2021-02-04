import { Inject, Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { BLADE_ENTRY_TOKEN } from "./blade-entry-token";
import { BladeRegistry } from "./blade-registry.service";
import { BladeCreationParams } from "./models/blade-creation-params";
import { BladeMetaData } from "./models/blade-meta-data";
import { BladeParam } from "./models/blade-param";
import { BladeState } from "./models/blade-state";
import { BladeContext } from "./models/blader-context";

@Injectable()
export class BladeManager implements OnDestroy {
    private _bladesSubject: BehaviorSubject<Array<BladeContext>> =
        new BehaviorSubject<BladeContext[]>(new Array<BladeContext>());
    private activeBladesSubject = new BehaviorSubject<string[][]>([]);
    private subscription = new Subscription();

    public entryId: string;
    public selected: BladeContext | undefined;

    public get blades$(): Observable<Array<BladeContext>> {
        return this._bladesSubject.asObservable();
    }

    public get activateBlades$(): Observable<string[][]> {
        return this.activeBladesSubject.asObservable();
    }

    public constructor(
        private readonly _registry: BladeRegistry,
        @Inject(BLADE_ENTRY_TOKEN) private readonly entryBladeName: string,
        private readonly router: Router,
        private readonly dialog: MatDialog
    ) {
        this.subscription.add(
            this.router.events
                .pipe(filter((e) => e instanceof NavigationEnd))
                .subscribe((x: NavigationEnd) => this.navigateToBlade(x.url))
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public navigateToParent(child: string, click: string = null): void {
        let { parent } = this.get(child);
        if (parent.id.endsWith('-menu') && parent.parent) {
            parent = parent.parent;
        }
        this.navigateTo(parent.id, click);
    }

    public navigateTo(parent: string, click: string = null): void {
        if (
            this._bladesSubject.value.find(
                (b: BladeContext) => !b.isLoading.value && b.isDirtySubject.value
            )
        ) {
            /* add confirm dialog-component */
            
            // const dialogRef = ConfirmDialogComponent.open(this.dialog, {
            //     title: 'Unsaved changes',
            //     message: 'Do you want to discard your changes',
            //     confirmMessage: 'Discard',
            //     dismissMessage: 'Cancel',
            // });

            // this.subscription.add(
            //     dialogRef.afterClosed().subscribe((result) => {
            //         if (result) {
            //             this.navigate(parent, click);
            //         }
            //     })
            // );

            this.navigate(parent, click);
            
        } else {
            this.navigate(parent, click);
        }
    }

    public select(id: string): void {
        this.selected = this.get(id);
    }

    public paramValueExist(id: string, paramKey: string): boolean {
        const params = this.getBaldeParamsIfBladeExists(id);
        return params.some((p: BladeParam) => p.key === paramKey);
    }

    public getParamValue<T extends string | number>(
        id: string,
        paramKey: string,
        checkAncestor: boolean,
        optional: boolean
    ): T {
        if (!this.exists(id)) {
            throw new Error(`Blade ${id} does not exist!`);
        }

        const ctx = this.get(id);
        const param = ctx.params.find((p: BladeParam) => p.key === paramKey);

        if (param) {
            return param.value as T;
        }

        if (checkAncestor && ctx.parent) {
            return this.getParamValue(
                ctx.parent.id,
                paramKey,
                checkAncestor,
                optional
            );
        }

        if (!optional) {
            throw new Error(`Param ${paramKey} for ${id} does not exist!`);
        }
        return undefined;
    }

    private removeAllFromParent(parent: BladeContext): void {
        const allowedParents = [null];

        let p = parent;
        while (p) {
            allowedParents.push(p);
            p = p.parent;
        }

        this._bladesSubject.next(this._bladesSubject.value.filter((b) => allowedParents.includes(b)));
    }

    private exists(id: string): boolean {
        return this._bladesSubject.value.some((b: BladeContext) => b.id === id);
    }

    public get(id: string): BladeContext {
        const item = this._bladesSubject.value.find((b: BladeContext) => b.id === id);

        if (!item) {
            throw new Error(`BladeData for key ${id} was not found!`);
        }

        return item;
    }

    public navigateToBlade(url: string): void {
        try {
            const activeBlades = [];
            const lastBlade = [
                this.entryBladeName,
                ...url.split('/blade/').slice(1),
            ].reduce((acc, bladeRoute, index) => {
                const args = bladeRoute.split('/');
                const activeBlade = this._bladesSubject.value[index];
                const params: BladeParam[] = [];

                let prev = args.length % 2 === 0 ? 'id' : undefined;
                for (let i = 1; i < args.length; i += 1) {
                    if (prev) {
                        params.push({ key: prev, value: args[i] });
                        prev = undefined;
                    } else {
                        prev = args[i]
                    }
                }

                const bladeProperties = {
                    parent: acc ? this.get(acc) : null,
                    key: args[0],
                    params,
                };

                activeBlades.push(args);

                if (!activeBlade) {
                    this.addWithParams(bladeProperties);
                } else {
                    const sameKey = activeBlade.id === args[0];
                    const sameLength = params.length === activeBlade.params.length;
                    const bladeAlreadyActive = params.reduce((active, param) => {
                        if (!active) {
                            return false;
                        }
                        const otherParamValue = activeBlade.params.find(
                            (s) => s.key === param.key
                        )?.value;
                        return otherParamValue === param.value;
                    }, sameKey && sameLength);

                    if (!bladeAlreadyActive) {
                        this.removeAllFromParent(activeBlade.parent);
                        this.addWithParams(bladeProperties);
                    }
                }

                return args[0];
            }, '');

            let context = this.get(lastBlade);

            const lastBladeParts = lastBlade.split('-');
            const lastBladeType = lastBladeParts.pop();
            if (lastBladeType === 'menu') {
                const bladeKey = `${lastBladeParts.join('-')}-general`;
                context = this.addWithParams({
                    parent: context,
                    key: bladeKey,
                });

                activeBlades.push([bladeKey]);
            }

            this.removeAllFromParent(context);
            this.activeBladesSubject.next(activeBlades);

            setTimeout(() => {
                const elements = document.getElementsByClassName('blade--selected');
                if (elements && elements.length > 0) {
                    elements[0].scrollIntoView();
                }
            }, 20);
        } catch (e) {
            console.log('Failed to navigate', e);
        }
    }
    
    public addWithParams(params: BladeCreationParams): BladeContext {
        const id = params.key;
        return this.addInternal(
            params.parent,
            params.key,
            id,
            params.params,
            params.state
        );
    }

    private addInternal(
        parent: BladeContext,
        key: string,
        id: string,
        params: BladeParam[],
        state?: BladeState
    ): BladeContext {
        const metaData = this.getMetaData(key);
        const newId = id || new Date().valueOf().toString();

        if (!state) {
            state = metaData.state;
        }

        const ctx = new BladeContext(parent, newId, metaData, state, params);
        ctx.isEntry = this._bladesSubject.value.length === 0;
        if (ctx.isEntry) {
            this.entryId = newId;
        }
        this._bladesSubject.next([...this._bladesSubject.value, ctx]);
        this.select(ctx.id);
        return ctx;
    }

    public getBaldeParamsIfBladeExists(id: string): Array<BladeParam> {
        if (!this.exists(id)) {
            return new Array<BladeParam>();
        }
        const ctx = this.get(id);
        if (!ctx.hasParams) {
            return new Array<BladeParam>();
        }

        return ctx.params;
    }
    
    private getMetaData(key: string): BladeMetaData {
        return this._registry.get(key);
    }

    public navigate(parent: string, click: string) {
        let pContext = this.get(parent);
        let url = click ? `/blade/${click}` : '';
        while (pContext.parent) {
            const bladeUrl = pContext.params.reduce((prev, param) => {
                if (param.key === 'id') {
                    return `${prev}/${param.key}/${param.value}`;
                }
                return `${prev}/${param.key}/${param.value}`;
            }, `/blade/${pContext.id}`);
            
            url = `${bladeUrl}${url}`;
            pContext = pContext.parent;
        }
        
        const rootUrl = this.router.url.split('/').slice(0, 3).join('/');
        this.router.navigate([rootUrl + url]);
    }
}
