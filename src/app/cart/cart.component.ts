import { Component } from '@angular/core';
import { CartService } from '../services/cart-service.service';
import { ProductService } from '../services/product-service.service';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',

  // imports: [FooterComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: Map<number, number> = new Map();
  products: any[] = [];
  // listCartItem: Map<any,number> = new Map();
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    let keyArray: number[] = Array.from(this.cart.keys());

    this.productService.getProductByIds(keyArray).subscribe({
      next: (response: any) => {
        debugger;
        for (const product of response) {
          const cartProduct = {
            ...product,
            quantity: this.cart.get(product.id),
          };
          this.products.push(cartProduct);
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching cartItem: ', error);
      },
    });
  }

  getAllCartItem() {}

  // deleteCartItem(idProduct: number): void {
  //   this.cartService.deleteCartItem(idProduct);
  //   this.getAllCartItem();
  // }
}
