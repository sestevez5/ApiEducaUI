import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelModalMarkdownComponent } from './panel-modal-markdown.component';

describe('PanelModalMarkdownComponent', () => {
  let component: PanelModalMarkdownComponent;
  let fixture: ComponentFixture<PanelModalMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelModalMarkdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelModalMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
