import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterOperationComponent } from './parameter-operation.component';

describe('ParameterOperationComponent', () => {
  let component: ParameterOperationComponent;
  let fixture: ComponentFixture<ParameterOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
