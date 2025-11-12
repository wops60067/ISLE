import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  saveToLocalStorage(){
    localStorage.setItem('cartItems',JSON.stringify(this.cartItems))
  }
  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveToLocalStorage();
    alert('加入成功')
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== itemId);
    this.cartItemsSubject.next(this.cartItems);
    this.saveToLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  nowItems(){
    this.cartItemsSubject.next(this.cartItems)
  }
}
