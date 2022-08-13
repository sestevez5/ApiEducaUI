import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersOperationComponent } from './parameters-operation.component';

describe('ParametersOperationComponent', () => {
  let component: ParametersOperationComponent;
  let fixture: ComponentFixture<ParametersOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
