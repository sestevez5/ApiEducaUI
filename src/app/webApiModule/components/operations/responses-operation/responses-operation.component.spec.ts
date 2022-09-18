import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesOperationComponent } from './responses-operation.component';

describe('ResponsesOperationComponent', () => {
  let component: ResponsesOperationComponent;
  let fixture: ComponentFixture<ResponsesOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsesOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
