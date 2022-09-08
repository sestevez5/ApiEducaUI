import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOperationInformationExecutionComponent } from './panel-operation-information-execution.component';

describe('PanelOperationInformationExecutionComponent', () => {
  let component: PanelOperationInformationExecutionComponent;
  let fixture: ComponentFixture<PanelOperationInformationExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOperationInformationExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOperationInformationExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
