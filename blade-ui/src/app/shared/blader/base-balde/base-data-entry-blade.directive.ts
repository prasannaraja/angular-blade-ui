import { Directive, OnInit } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ModelDataEntityModel } from "../models/model-data-entity-model";
import { BaseBladeDirective } from "./base-blade.directive";
import { FormGroup } from 'ngx-typesafe-forms'

@Directive()
export abstract class BaseDataEntryBladeDirective<
    T extends ModelDataEntityModel,
    FT 
>extends BaseBladeDirective implements OnInit {
    private _data$ = new BehaviorSubject<T>(null);
    private subscription = new Subscription();
    public dataForm: FormGroup<FT>;

    public get data$(): Observable<T> {
        return this._data$.asObservable().pipe(filter((d) => !!d));
    }

    public abstract getData(identifer: string):Observable<T>;
    public abstract putData(identifer: string):Observable<T>;

    ngOnInit() {
        this.subscription.add(EMPTY.subscribe());
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}