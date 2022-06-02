import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDtoComponent } from './detalle-dto.component';

describe('DetalleDtoComponent', () => {
  let component: DetalleDtoComponent;
  let fixture: ComponentFixture<DetalleDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
