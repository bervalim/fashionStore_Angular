import { Component, signal } from '@angular/core';
import { ProductRequest } from '../../api/product.request';
import { IProduct } from '../../interfaces/product.interface';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  providers: [ProductRequest],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  // Criando um signal para a lista de produtos:
  readonly productListSignal = signal<IProduct[]>([]);
  // Será necessário colher os identificadores que se alteram dinamicamente
  // Por isso,iremos utilizar o route
  constructor(
    private route: ActivatedRouteSnapshot,
    private productRequest: ProductRequest
  ) {}
}
