import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-dialog',
  imports: [CommonModule],
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})
export class ProductDetailDialogComponent {
  // 模擬所有產品列表
  products = [
    { id: 1, name: '慕林[30ml]', description: '春日山林中，杏桃花飄落，木香與花香交織。', images: ['assets/img/logo.jpg'], ingredients: '杏桃、雪松、麝香', usage: '輕噴於手腕、頸後等脈搏處。' },
    { id: 2, name: '疏影[30ml]', description: '傍晚庭院，茉莉與桂花在風中若隱若現。', images: ['assets/img/logo.PNG'], ingredients: '茉莉、桂花、琥珀', usage: '可視場合適量補噴，加強記憶點。' },
    { id: 3, name: '無聲[30ml]', description: '夜色中書房的氣味，紙張、皮革與木頭的沉靜融合。', images: ['assets/img/background.jpg'], ingredients: '皮革、雪松、香根草', usage: '適合安靜時光，細品其香。' },
    { id: 4, name: '初雨[30ml]', description: '雨初歇時的空氣，帶有柑橘與青苔的清新氣味。', images: ['assets/img/logo.jpg'], ingredients: '柑橘、青苔、廣藿香', usage: '每日清晨/沐浴後噴灑最佳。' }
  ];

  images: string[] = [];
  currentImage = 0;

  productName = '';
  description = '';
  ingredients = '';
  usage = '';

  showIngredients = false;
  showUsage = false;

  constructor(private route: ActivatedRoute) {
    // 取得URL參數ID，查找對應產品
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.products.find(p => p.id === id);
    if (found) {
      this.productName = found.name;
      this.description = found.description;
      this.ingredients = found.ingredients;
      this.usage = found.usage;
      this.images = found.images;
    }
  }

  nextImage() { if (this.currentImage < this.images.length - 1) this.currentImage++; }
  prevImage() { if (this.currentImage > 0) this.currentImage--; }
  goToImage(idx: number) { this.currentImage = idx; }
}
