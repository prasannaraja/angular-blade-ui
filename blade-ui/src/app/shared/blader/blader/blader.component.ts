import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'budget-blader',
  templateUrl: './blader.component.html',
  styleUrls: ['./blader.component.scss']
})
export class BladerComponent implements OnInit {

  public bladesContext = of([0,1]);
  constructor() { }

  ngOnInit(): void {
  }

}
