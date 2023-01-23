import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPropertiesComponent } from './tabla-properties.component';

describe('TablaPropertiesComponent', () => {
  let component: TablaPropertiesComponent;
  let fixture: ComponentFixture<TablaPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
