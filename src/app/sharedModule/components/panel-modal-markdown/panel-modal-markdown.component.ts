import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-panel-modal-markdown',
  templateUrl: './panel-modal-markdown.component.html',
  styleUrls: ['./panel-modal-markdown.component.css']
})
export class PanelModalMarkdownComponent implements OnInit {


 
  constructor( public dialogRef: MatDialogRef<PanelModalMarkdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cabecera: string, contenidoMarkdown: string},) { }

  ngOnInit(): void {
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

}
