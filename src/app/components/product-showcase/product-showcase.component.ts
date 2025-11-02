import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItem, CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

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
    { id: 1, name: '香水1', description: '產品描述1', price: 2800 },
    { id: 2, name: '香水2', description: '產品描述2', price: 3200 },
    { id: 3, name: '香水3', description: '產品描述3', price: 3500 },
  ];

  seasonalItems = [
    {
      title: '秋日琥珀限量版',
      description: '靈感來自楓葉與木質調，溫暖而細膩的層次。',
      image: 'assets/img/background.jpg'
    },
    {
      title: '晨露白茶輕香',
      description: '清新透亮的白茶香氣，適合日常與通勤。',
      image: 'assets/img/logo.jpg'
    },
    {
      title: '夜幕黑莓淡香精',
      description: '果香與麝香交織，展現低調而不失個性的夜色。',
      image: 'assets/img/background.jpg'
    }
  ];

  currentSlideIndex = 0;

  constructor(private service:CartService){};

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
}
