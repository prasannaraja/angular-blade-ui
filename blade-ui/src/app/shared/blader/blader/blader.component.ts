import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BladeManager } from '../blade-manager.service';
import { BladeArgs } from '../models/blade-args';
import { BladeContext } from '../models/blader-context';

@Component({
  selector: 'budget-blader',
  templateUrl: './blader.component.html',
  styleUrls: ['./blader.component.scss']
})
export class BladerComponent {

  public get bladeContext$(): Observable<Array<BladeContext>> {
    return this._mgr.blades$;
  }
  public constructor(private _mgr: BladeManager) { }
  
  public selectBlade(args: BladeArgs): void {
    if (this._mgr.selected && args.id === this._mgr.selected.id) {
      return;
    }

    this._mgr.select(args.id);
  }

  public closed(args: BladeArgs): void {
    this._mgr.navigateToParent(args.id);
  }
}
