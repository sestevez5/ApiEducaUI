import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDtosComponent } from './main-dtos.component';

describe('MainDtosComponent', () => {
  let component: MainDtosComponent;
  let fixture: ComponentFixture<MainDtosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDtosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDtosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
