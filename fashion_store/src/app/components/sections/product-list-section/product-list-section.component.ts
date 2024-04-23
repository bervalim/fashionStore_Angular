import { Component, Input } from '@angular/core';
import { IProduct } from '../../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list-section.component.html',
  styleUrl: './product-list-section.component.scss',
})
export class ProductListSectionComponent {
  constructor(private cartService: CartService) {}

  @Input() productList!: IProduct[];
  @Input() title!: string;

  handleAddProduct(product: IProduct) {
    return this.cartService.addProductToCart(product);
  }

  redirectURL(productId: number) {
    return `/product/${productId}`;
  }
}
