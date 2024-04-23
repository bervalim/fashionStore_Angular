import { Component, Input } from '@angular/core';
import { IProduct } from '../../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list-section.component.html',
  styleUrl: './product-list-section.component.scss',
})
export class ProductListSectionComponent {
  // Iremos criar duas possíveis entradas de dados
  // Uma terá todos os produtos
  // Outro terá todos menos o refernciando na URL.
  // Será uma entrada para uma lista de produtos
  @Input() productList!: IProduct[];
  // O componente title irá se portar de forma variável
  @Input() title!: string;

  redirectURL(productId: number) {
    return `/product/${productId}`;
  }
}
