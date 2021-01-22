import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSetComponent } from './model-set.component';

describe('ModelSetComponent', () => {
  let component: ModelSetComponent;
  let fixture: ComponentFixture<ModelSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
