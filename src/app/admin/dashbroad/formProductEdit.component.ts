import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category-service.service';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'form-editProduct',
  templateUrl: './formProductEdit.component.html',
  styleUrl: './formProductEdit.component.scss',
})
export class FormProductEdit {
  name: string;
  description: string;
  price: number;
  categorrId: number;
  productId: any;
  product: any;
  listCategory: any[] = [];
  public Editor = ClassicEditor;
  public fullName: string = '';
  selectedFiles: any;
  thumbnail: any;
  urls: string []= [];
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private http: HttpClient,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.categorrId = 0;
  }
  ngOnInit() {
    debugger;
    this.categoryService.getAll().subscribe((response) => {
      this.listCategory = response;
      console.log(this.listCategory);
    });

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
  addProduct() {
    const urlAddProduct = 'http://localhost:8080/ShopBookPTD/api/v1/products';

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString()); // Chuyển đổi price sang kiểu string
    formData.append('category_id', this.categorrId.toString()); // Chuyển đổi category_id sang kiểu string

    // Thêm các ảnh được chọn vào formData
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append(
        'images',
        this.selectedFiles[i],
        this.selectedFiles[i].name
      );
    }
    formData.append('thumbnail', this.thumbnail[0], this.thumbnail[0].name);

    this.http.post(urlAddProduct, formData).subscribe({
      next: (response: any) => {
        alert('Thêm sản phẩm thành công !!!');
        console.log();
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Không thể thêm sản phẩm, lỗi: ${error.error}`);
      },
    });
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  loadThumbnail(event: any) {
    this.thumbnail = event.target.files;
  }
  loadDataForForm() {
    debugger;
    this.name = this.product.name;
    this.price = this.product.price;
    this.description = this.product.description;
    this.categorrId=this.product.categoryId;
  }

  // product: any;
  // name: string;
  // description: string;
  // price: number;
  // categorrId: number;
  // listCategory: any[] = [];
  // public Editor = ClassicEditor;
  // public fullName: string = '';
  // selectedFiles: any;
  // thumbnail: any;
  // productId: number;
  // constructor(
  //   private userService: UserService,
  //   private categoryService: CategoryService,
  //   private http: HttpClient,
  //   private productService: ProductService,
  //   private activatedRoute: ActivatedRoute
  // ) {
  //   this.name = '';
  //   this.description = '';
  //   this.price = 0;
  //   this.categorrId = 0;
  //   this.productId = 0;
  // }
  // ngOnInit() {
  //   this.categoryService.getAll().subscribe((response) => {
  //     this.listCategory = response;
  //     console.log(this.listCategory);
  //   });
  //   debugger;
  //   const param = this.activatedRoute.snapshot.paramMap.get('id');
  //   if (param !== null) {
  //     this.productId = Number(param);
  //   }
  //   if (!isNaN(this.productId)) {
  //     this.productService.getProductDetail(this.productId).subscribe({
  //       next: (response: any) => {
  //         //lay danh sach anh san pham va URL
  //         this.product = response;
  //         // this.productImages = response.productImages;
  //         console.log(this.product);
  //         this.name = this.product.name;
  //         this.description = this.product.description;
  //         this.price = this.product.price;
  //         // this.categorrId = 0;
  //         // this.productId=0;
  //       },
  //       complete: () => {},
  //       error: (error: any) => {
  //         console.error('Error fetching detail :', error);
  //       },
  //     });
  //   } else {
  //     console.error('Invalid productId: ', param);
  //   }
  // }
  // addProduct() {
  //   const urlAddProduct = 'http://localhost:8080/ShopBookPTD/api/v1/products';

  //   const formData = new FormData();
  //   formData.append('name', this.name);
  //   formData.append('description', this.description);
  //   formData.append('price', this.price.toString()); // Chuyển đổi price sang kiểu string
  //   formData.append('category_id', this.categorrId.toString()); // Chuyển đổi category_id sang kiểu string

  //   // Thêm các ảnh được chọn vào formData
  //   for (let i = 0; i < this.selectedFiles.length; i++) {
  //     formData.append(
  //       'images',
  //       this.selectedFiles[i],
  //       this.selectedFiles[i].name
  //     );
  //   }
  //   formData.append('thumbnail', this.thumbnail[0], this.thumbnail[0].name);

  //   this.http.post(urlAddProduct, formData).subscribe({
  //     next: (response: any) => {
  //       alert('Thêm sản phẩm thành công !!!');
  //       console.log();
  //     },
  //     complete: () => {
  //       debugger;
  //     },
  //     error: (error: any) => {
  //       alert(`Không thể thêm sản phẩm, lỗi: ${error.error}`);
  //     },
  //   });
  // }

  // onFileSelected(event: any) {
  //   this.selectedFiles = event.target.files;
  // }

  // loadThumbnail(event: any) {
  //   this.thumbnail = event.target.files;
  // }
}
