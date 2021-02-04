import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BaseBladeDirective } from '../base-balde/base-blade.directive';
import { BladeManager } from '../blade-manager.service';
import { BladeArgs } from '../models/blade-args';
import { BladeState } from '../models/blade-state';
import { BladeContext } from '../models/blader-context';

@Component({
  selector: 'budget-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.scss']
})
export class BladeComponent implements OnInit, OnDestroy {

  private _componentRef: ComponentRef<BaseBladeDirective>;
  private _bladeState: BladeState = BladeState.default;
  private subscriptions = new Subscription();
  public state$: Observable<{ loading: boolean }>;
  
  @Input()
  public context: BladeContext;
  @Output()
  public stateChanged: EventEmitter<BladeState> = new EventEmitter<BladeState>();

  @Output()
  public selected: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  @Output()
  public closed: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  public get title$(): Observable<string> {
    return this._componentRef.instance.title$;
  }

  public get isDirty$(): Observable<boolean> {
    return this._componentRef.instance.isDirty$;
  }

  public get canMinimize(): boolean {
    return this._bladeState === BladeState.wide;
  }

  public get canMaximize(): boolean {
    return this._bladeState === BladeState.default
  }

  public get bladeState(): BladeState {
    return this._bladeState;
  }

  public get isSelected(): boolean {
    if (!this._mgr.selected) {
      return false;
    }
    if (!this.context) {
      return false;
    }

    return this._mgr.selected.id === this.context.id;
  }

  @ViewChild('bladeContent', { read: ViewContainerRef, static: true })
  protected bladeContent: ViewContainerRef;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private _mgr: BladeManager,
    private _resolver: ComponentFactoryResolver
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    if (this.context) {
      const factory = this.context.metaData.factoryFn
        ? this.context.metaData.factoryFn()
        : this._resolver.resolveComponentFactory(
          this.context.metaData.component
        );
      this._componentRef = this.bladeContent.createComponent(
        factory,
        this.bladeContent.length
      );
      this._componentRef.instance.id = this.context.id;
      this._bladeState = this.context.state;

      this.state$ = this._componentRef.instance.stateSubject;
      this._componentRef.changeDetectorRef.detectChanges();

      this.subscriptions.add(
        this._componentRef.instance.isDirty$?.subscribe((isDirty) =>
          this.context.isDirtySubject.next(isDirty)
        )
      );     
    }
  }

  @HostListener('window:keydown',['$event'])
  public shortCuts(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'q') {
      if (this.isSelected) {
        this.close()
      }
    }
  }

  public select(): void {
    this.selected.next(this.context.toBaldeArgs());
  }

  public changeState(state: BladeState): void {
    this._bladeState = state;

    this.stateChanged.next(this._bladeState);
  }

  public close(): void {
    if (this.context.isEntry) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      this.closed.next(this.context.toBaldeArgs());
    }
  }
}
