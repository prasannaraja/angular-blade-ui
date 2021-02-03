import { Directive, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { BaseBladeDirective } from "./base-blade.directive";

@Directive()
export abstract class BaseMenuBladeDirective<T extends {id: number }> 
    extends BaseBladeDirective 
    implements OnInit {
    private _data$ = new BehaviorSubject<T>(null);

    public get data$(): Observable<T> {
        return this._data$.asObservable().pipe(filter((d) => !!d));
    }

    ngOnInit() {   
    }
}