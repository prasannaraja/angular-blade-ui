import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BladesContainerComponent } from './blades-container.component';

describe('BladesContainerComponent', () => {
  let component: BladesContainerComponent;
  let fixture: ComponentFixture<BladesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BladesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BladesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
