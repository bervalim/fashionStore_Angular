import { Component, signal } from '@angular/core';
import { ProductRequest } from '../../api/product.request';
import { IProduct } from '../../interfaces/product.interface';
import { ProductListSectionComponent } from '../../components/sections/product-list-section/product-list-section.component';
import { HomeSectionComponent } from '../../components/sections/home-section/home-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListSectionComponent, HomeSectionComponent],
  providers: [ProductRequest],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  // Armazenando a requisição em um signal reativo:
  readonly productListSignal = signal<IProduct[]>([]);

  constructor(private productRequest: ProductRequest) {
    // Iremos inseri-lo no constructor, para que a lista de productos seja carregada instantaneamente ao
    // Carregarmos a página.
    // Iremos Inserir a Lista de Produtos proveneniente da requisição, dentro do signal
    this.productRequest.getProductsListRequest().subscribe((data) => {
      this.productListSignal.set(data);
    });
  }

  // Iremos referenciar o signal em um getter. Dessa forma a variável irá ser restringir a parte lógica, para que exista reatividade

  get productList() {
    return this.productListSignal();
  }
}
