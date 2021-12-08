import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() lable: string = 'no-label';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() click: EventEmitter<any> = new EventEmitter();

  public btnClick($event): void{
    this.click.emit($event);
  }

}
