import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  product: any;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  // productImages = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit() {
    debugger;
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param !== null) {
      this.productId = Number(param);
    }
    if (!isNaN(this.productId)) {
      this.productService.getProductDetail(this.productId).subscribe({
        next: (response: any) => {
          //lay danh sach anh san pham va URL
          this.product = response;
          // this.productImages = response.productImages;
          this.showImage(0);
        },
        complete: () => {},
        error: (error: any) => {
          console.error('Error fetching detail :', error);
        },
      });
    } else {
      console.error('Invalid productId: ', param);
    }
  }
  showImage(index: number): void {
    if (this.product > 0) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.productImages.length) {
        index = this.product.productImages.length - 1;
      }
      this.currentImageIndex = index;
    }
  }
  thumbnailClick(index: number) {
    this.currentImageIndex = 1;
    this.showImage(this.currentImageIndex);
    console.log(index);
  }
  nextImage(): void {
    debugger;
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger;
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void {
    debugger;
    if (this.product) {
      this.cartService.addToCart(this.productId, this.quantity);
    } else {
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
