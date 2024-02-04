import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '../services/cart-service.service';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // const cart = this.cartService.getCart();
    // const productIds = Array.of(cart.keys);
    // this.productService.getProductByIds(productIds).subscribe({});
  }
}
