import { Component, inject, model, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-css-copy-modal',
  imports: [],
  templateUrl: './css-copy-modal.component.html',
  styleUrl: './css-copy-modal.component.scss',
})
export class CssCopyModalComponent implements OnInit {
  ngOnInit(): void {
    console.log('this.data:', this.data);
    
  }
  private readonly dialogRef = inject(MatDialogRef<CssCopyModalComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public CopyCss(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.data)
        .catch(() => {
          this.copyUsingTextArea();
        });
    } else {
      this.copyUsingTextArea();
    }
  }

  private copyUsingTextArea(): void {
    const textArea = document.createElement('textarea');
    textArea.value = this.data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
} 
