import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../services/product-service.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart-service.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent {
  name: string;
  description: string;
  price: number;
  categorrId: number;
  categoryName: string;
  product: any;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  urlThumbnail: any;
  productImage: any[] = [];
  // productImages = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.categorrId = 0;
    this.categoryName = '';
  }
  ngOnInit() {
    debugger;
    debugger;
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param !== null) {
      this.productId = Number(param);
    }
    if (!isNaN(this.productId)) {
      debugger;
      this.productService.getProductDetail(this.productId).subscribe({
        next: (response: any) => {
          //lay danh sach anh san pham va URL
          this.product = response;
          this.loadDataForForm();
          console.log('lay product thanh cong ');
          console.log(this.product);
          console.log('categoryName :' + this.categoryName);
        },
        complete: () => {},
        error: (error: any) => {
          console.log('Loi tu lay chi tiet product ');
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
  loadDataForForm() {
    debugger;
    this.name = this.product.name;
    this.price = this.product.price;
    this.description = this.product.description;
    this.categorrId = this.product.categoryId;
    this.urlThumbnail = this.product.thumbnail;
    this.productImage = this.product.productImages;
    // this.categoryName = this.product.category.name;
  }
}
