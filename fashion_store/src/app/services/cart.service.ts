import { Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Não usaremos constructor, pois a lógica de adicionar ao carrinho não vem da API
  // Criando um Signal para verificar se o modal do carrinho etá ou não aberto:
  readonly isCartOpenSignal = signal(false);

  // Criando um signal para representar a lista de produtos do carrinho:
  readonly cartProductListSignal = signal<IProduct[]>([]);

  // Executando os signals para não executar os signals de forma direta
  // nos outros componentes
  getIsCartOpen() {
    return this.isCartOpenSignal();
  }

  getCartProductList() {
    return this.cartProductListSignal();
  }

  // Criando manipulações para abrir e fechar o modal:
  // Vai servir tanto para abri como para fechar o modal.
  setIsCartOpen(value: boolean) {
    this.isCartOpenSignal.set(value);
  }

  // Quando adicionamos um produto ao carrinho, queremos que o modal feche
  // Criaando um método para adicionar um produto ao carrinho:
  // Pegamos todos os itens da lista atual e adicionanos o novo produto
  addProductToCart(product: IProduct) {
    this.cartProductListSignal.update((cartProductList) => [
      ...cartProductList,
      product,
    ]);
    this.setIsCartOpen(true);
  }

  removeProductFromCart(productId: number) {
    this.cartProductListSignal.update((cartProductList) =>
      cartProductList.filter((product) => product.id !== productId)
    );
  }
}
