import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    cartItemCount: number = 0;

    constructor(private router: Router, private cartService: CartService) {}

    ngOnInit() {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        });
    }
    goToCart() {
        this.router.navigate(['/cart']);
    }
    goToLogin() {
      this.router.navigate(['/login']);
  }
}
