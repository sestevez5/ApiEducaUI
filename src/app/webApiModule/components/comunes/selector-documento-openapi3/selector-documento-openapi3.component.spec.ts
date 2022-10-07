import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDocumentoOpenapi3Component } from './selector-documento-openapi3.component';

describe('SelectorDocumentoOpenapi3Component', () => {
  let component: SelectorDocumentoOpenapi3Component;
  let fixture: ComponentFixture<SelectorDocumentoOpenapi3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorDocumentoOpenapi3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorDocumentoOpenapi3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
