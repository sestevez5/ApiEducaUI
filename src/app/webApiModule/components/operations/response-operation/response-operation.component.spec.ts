import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseOperationComponent } from './response-operation.component';

describe('ResponseOperationComponent', () => {
  let component: ResponseOperationComponent;
  let fixture: ComponentFixture<ResponseOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
