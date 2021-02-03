import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { EntityUpdateBroadcastService } from "../../services/entity-update-broadcast.service";
import { BladeManager } from "../blade-manager.service";
import { BladerModule } from "../blader.module";

@Directive()
export abstract class BaseBladeDirective
  implements BladerModule, OnInit, OnDestroy {
  public id: string;
  public title$: Observable<string>;

  public stateSubject = new BehaviorSubject<{ loading: boolean }>({
    loading: false,
  });
  public abstract get isDirty$(): Observable<boolean>;
  // protected readonly subscription = new Subscription();
  constructor(
    protected readonly mgr: BladeManager,
    protected readonly entityUpdateBroadcastService: EntityUpdateBroadcastService,
    protected readonly route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  public click(click: string, ...args): void {
      if(args) {
          click += `/${args.join('/')}`;
      }
      this.mgr.navigateTo(this.id, click);
  }
  public getParam<T extends string | number>( key: string, checkAncestors = true, optional = false) : T {
      return this.mgr.getParamValue<T>(this.id, key, checkAncestors, optional);
  }
}
