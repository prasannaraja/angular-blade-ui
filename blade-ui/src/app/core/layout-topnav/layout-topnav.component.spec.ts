import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTopnavComponent } from './layout-topnav.component';

describe('LayoutTopnavComponent', () => {
  let component: LayoutTopnavComponent;
  let fixture: ComponentFixture<LayoutTopnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutTopnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
