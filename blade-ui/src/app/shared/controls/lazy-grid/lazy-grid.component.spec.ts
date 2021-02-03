import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyGridComponent } from './lazy-grid.component';

describe('LazyGridComponent', () => {
  let component: LazyGridComponent;
  let fixture: ComponentFixture<LazyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
