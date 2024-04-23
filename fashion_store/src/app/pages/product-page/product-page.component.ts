import { Component, signal } from '@angular/core';
import { ProductRequest } from '../../api/product.request';
import { IProduct } from '../../interfaces/product.interface';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ProductListSectionComponent } from '../../components/sections/product-list-section/product-list-section.component';
import { ProductDescriptionSectionComponent } from '../../components/sections/product-description-section/product-description-section.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductListSectionComponent, ProductDescriptionSectionComponent],
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
    private route: ActivatedRoute,
    private productRequest: ProductRequest
  ) {
    // Esse subscribe será responsável por extrair os identificadores.
    // únicos da URL de maneira dinâmica.
    // A chave id foi definida no roteador.
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        // Este data trará todos os produtos da lista
        // Porém, para nossa lógica, desejamos excluir o produto que foi selecionado
        // na URL(parâmetro da rota)
        this.productRequest.getProductsListRequest().subscribe((data) => {
          const newData = data.filter((product) => product.id !== Number(id));
          // Essa lista será aplicada no signal
          this.productListSignal.set(newData);
          // Isso irá gerar uma  nova lista sem o produto que está sendo referenciado na URL
          //
        });
      }
    });
  }

  get productList() {
    return this.productListSignal();
  }
}
