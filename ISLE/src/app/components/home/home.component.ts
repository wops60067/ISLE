import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ProductShowcaseComponent } from '../product-showcase/product-showcase.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ProductShowcaseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
