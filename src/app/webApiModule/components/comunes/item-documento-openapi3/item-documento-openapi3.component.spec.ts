import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDocumentoOpenApi3Component } from './item-documento-openapi3.component';

describe('ItemDocumentoOpenApi3Component', () => {
  let component: ItemDocumentoOpenApi3Component;
  let fixture: ComponentFixture<ItemDocumentoOpenApi3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDocumentoOpenApi3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDocumentoOpenApi3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
