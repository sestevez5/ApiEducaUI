import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExtensibleComponent } from './panel-extensible.component';

describe('PanelExtensibleComponent', () => {
  let component: PanelExtensibleComponent;
  let fixture: ComponentFixture<PanelExtensibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelExtensibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExtensibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
