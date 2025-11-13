import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItem, CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-product-showcase',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
],
  templateUrl: './product-showcase.component.html',
  styleUrl: './product-showcase.component.css'
})
export class ProductShowcaseComponent {
  products = [
    { id: 1, name_zh: '慕林', name_en: 'Mu Lin[30ml]', description: '-春日山林中，杏桃花飄落，木香與花香交織。', price: 'NT$2,800' },
    { id: 2, name_zh: '疏影', name_en: 'Shadow Trace[30ml]', description: '-傍晚庭院，茉莉與桂花在風中若隱若現。', price: 'NT$3,000' },
    { id: 3, name_zh: '無聲', name_en: 'Silent Form[30ml]', description: '-夜色中書房的氣味，紙張、皮革與木頭的沉靜融合。', price: 'NT$3,200' },
    { id: 3, name_zh: '初雨', name_en: 'First Rain[30ml]', description: '-雨初歇時的空氣，帶有柑橘與青苔的清新氣味。', price: 'NT$800' }
  ];
  seasonalItems = [
    {
      title: '慕林 Mu Lin[30ml]',
      description: '春日山林中，杏桃花飄落，木香與花香交織。',
      image: 'assets/img/background.jpg'
    },
    {
      title: '疏影 Shadow Trace[30ml]',
      description: '傍晚庭院，茉莉與桂花在風中若隱若現。',
      image: 'assets/img/logo.jpg'
    },
    {
      title: '無聲 Silent Form[30ml]',
      description: '夜色中書房的氣味，紙張、皮革與木頭的沉靜融合。',
      image: 'assets/img/background.jpg'
    },
    {
      title: '初雨 First Rain[30ml]',
      description: '雨初歇時的空氣，帶有柑橘與青苔的清新氣味。',
      image: 'assets/img/background.jpg'
    }
  ];

  currentSlideIndex = 0;

  // --- 輪播滑動參數 ---
  dragOffsetX: number = 0; // 拖曳偏移（px）
  private touchStartX: number = 0;
  private touchCurrentX: number = 0;
  private dragging: boolean = false;
  private touchMoved: boolean = false;
  transitionActive: boolean = true;

  getSlideTransform(): string {
    // 單張佔 100%，dragOffsetX 以百分比方式套用
    const offsetPercent = this.dragOffsetX / this.getCarouselWidth() * 100;
    const base = -this.currentSlideIndex * 100;
    return `translateX(${base + offsetPercent}%)`;
  }

  getCarouselWidth(): number {
    // 輪播寬度：每張都是區塊寬度
    return window.innerWidth; // 若有更精確容器寬可補寫
  }

  onTouchStart(event: TouchEvent) {
    this.touchMoved = false;
    this.dragging = true;
    this.transitionActive = false;
    this.touchStartX = event.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
    this.dragOffsetX = 0;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.dragging) return;
    this.touchMoved = true;
    this.touchCurrentX = event.touches[0].clientX;
    this.dragOffsetX = this.touchCurrentX - this.touchStartX;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.dragging) return;
    const diff = this.touchCurrentX - this.touchStartX;
    const threshold = 50;
    this.transitionActive = true;
    if (diff > threshold) {
      this.prevSlide();
    } else if (diff < -threshold) {
      this.nextSlide();
    }
    setTimeout(() => { this.dragOffsetX = 0; }, 10);
    this.dragging = false;
    this.touchMoved = false;
    this.touchStartX = 0;
    this.touchCurrentX = 0;
  }

  // 滑鼠拖曳支援
  private mouseStartX: number = 0;
  private mouseCurrentX: number = 0;
  private mouseDragging: boolean = false;

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.mouseDragging = true;
    this.transitionActive = false;
    this.mouseStartX = event.clientX;
    this.mouseCurrentX = this.mouseStartX;
    this.dragOffsetX = 0;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.mouseDragging) return;
    this.mouseCurrentX = event.clientX;
    this.dragOffsetX = this.mouseCurrentX - this.mouseStartX;
  }

  onMouseUp(event: MouseEvent) {
    if (!this.mouseDragging) return;
    const diff = this.mouseCurrentX - this.mouseStartX;
    const threshold = 50;
    this.transitionActive = true;
    if (diff > threshold) {
      this.prevSlide();
    } else if (diff < -threshold) {
      this.nextSlide();
    }
    setTimeout(() => { this.dragOffsetX = 0; }, 10);
    this.mouseDragging = false;
    this.mouseStartX = 0;
    this.mouseCurrentX = 0;
  }

  onMouseLeave(event: MouseEvent) {
    this.mouseDragging = false;
    this.dragOffsetX = 0;
    this.mouseStartX = 0;
    this.mouseCurrentX = 0;
    this.transitionActive = true;
  }

  constructor(private service:CartService, private dialog: MatDialog){};

  addCartItems(product: any) {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    };

    this.service.addToCart(item);
  }

  prevSlide() {
    const lastIndex = this.seasonalItems.length - 1;
    this.currentSlideIndex = this.currentSlideIndex === 0 ? lastIndex : this.currentSlideIndex - 1;
  }

  nextSlide() {
    const lastIndex = this.seasonalItems.length - 1;
    this.currentSlideIndex = this.currentSlideIndex === lastIndex ? 0 : this.currentSlideIndex + 1;
  }

  goToSlide(index: number) {
    if (index < 0 || index >= this.seasonalItems.length) return;
    this.currentSlideIndex = index;
  }

  openProductDetail(product:any) {
    this.dialog.open(ProductDetailDialogComponent, {
      data: product,
      width: '1500px',
    });
  }
}
