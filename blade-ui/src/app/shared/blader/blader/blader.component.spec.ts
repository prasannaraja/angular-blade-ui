import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BladerComponent } from './blader.component';

describe('BladerComponent', () => {
  let component: BladerComponent;
  let fixture: ComponentFixture<BladerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BladerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BladerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
