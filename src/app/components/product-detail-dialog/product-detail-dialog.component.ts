import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-dialog',
  imports: [CommonModule],
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})
export class ProductDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // 接收產品資料
  ) {}
}
