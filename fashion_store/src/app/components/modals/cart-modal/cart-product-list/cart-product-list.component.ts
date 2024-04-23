import { Component } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-product-list.component.html',
  styleUrl: './cart-product-list.component.scss',
})
export class CartProductListComponent {
  constructor(private cartService: CartService) {}

  handleRemoveProduct(productId: number) {
    return this.cartService.removeProductFromCart(productId);
  }
  //  será necessário renderizar os produtos de forma dinâmica
  // Getter

  get cartProductList() {
    return this.cartService.getCartProductList();
  }

  get total() {
    return this.cartProductList.reduce((accValue, product) => {
      return accValue + product.price;
    }, 0);
  }
}
