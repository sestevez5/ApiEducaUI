import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEndpointsComponent } from './main-endpoints.component';

describe('MainEndpointsComponent', () => {
  let component: MainEndpointsComponent;
  let fixture: ComponentFixture<MainEndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEndpointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
