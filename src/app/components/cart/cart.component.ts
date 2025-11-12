import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private service:CartService){};

  cartItems: CartItem[] = [];
  ngOnInit() {
    this.service.cartItems$.subscribe(item =>{
      this.cartItems = item;
    })
  }

  // 增加商品數量
  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.saveCartItems();
    this.service.nowItems();
  }

  // 減少商品數量
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCartItems();
      this.service.nowItems();
    }
  }

  // 移除商品
  removeItem(index: number) {
    if (confirm('確定要移除此商品嗎？')) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
      this.service.nowItems();
    }
  }

  // 獲取總商品數量
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // 獲取小計
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // 獲取總計
  getTotal(): number {
    return this.getSubtotal();
  }

  // 保存購物車數據
  saveCartItems() {
    // 實際應用中應該保存到服務或本地存儲
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // 前往結帳
  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('購物車是空的，請先添加商品');
      return;
    }
    
    // 實際應用中應該導航到結帳頁面
    console.log('前往結帳頁面', this.cartItems);
    alert('結帳功能開發中...');
  }
}
