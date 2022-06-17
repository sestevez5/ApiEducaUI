import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelParametrosComponent } from './panel-parametros.component';

describe('PanelParametrosComponent', () => {
  let component: PanelParametrosComponent;
  let fixture: ComponentFixture<PanelParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelParametrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
