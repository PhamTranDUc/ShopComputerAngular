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
  selectedFiles: any[] = [];
  thumbnail: any;
  urls: string[] = [];
  urlsNew: string[] = [];
  productImage: any[] = [];
  urlThumbnail: any;
  urlImageDelete: string[] = [];
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
  updateProduct() {
    const urlAddProduct = 'http://localhost:8080/ShopBookPTD/api/v1/products';

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString()); // Chuyển đổi price sang kiểu string
    formData.append('category_id', this.categorrId.toString()); // Chuyển đổi category_id sang kiểu string

    // Thêm các ảnh được chọn vào formData
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append(
          'images',
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
      }
    }
    if (this.thumbnail) {
      formData.append('thumbnail', this.thumbnail[0], this.thumbnail[0].name);
    }
    const urlImages = this.urlImageDelete.reduce((result, element) => {
      return result + element.toString() + ';';
    }, '');
    formData.append('urlImages', urlImages);

    this.http.put(urlAddProduct + '/' + this.productId, formData).subscribe({
      next: (response: any) => {
        alert('Cập nhập sản phẩm thành công !!!');
        console.log();
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Không thể cập nhập sản phẩm sản phẩm, lỗi: ${error.error}`);
        console.log(error);
      },
    });
  }

  loadDataForForm() {
    debugger;
    this.name = this.product.name;
    this.price = this.product.price;
    this.description = this.product.description;
    this.categorrId = this.product.categoryId;
    this.urlThumbnail = this.product.thumbnail;
    this.productImage = this.product.productImages;
    console.log('imagesUrl ' + this.product.productImages);
    for (let img of this.productImage) {
      this.urls.push(img.imageUrl);
    }
    console.log('urls ban đầu là : ' + this.urls);
  }

  loadThumbnail(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.urlThumbnail = e.target.result;
      };
    }
    this.thumbnail = event.target.files;
  }
  removeImage(index: number, url: string) {
    console.log('index and url :' + index + ' ' + url);
    this.urls.splice(index, 1);

    this.urlImageDelete.push(url);
  }
  removeImageNew(index: number) {
    this.urlsNew.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e: any) => {
          this.urlsNew.push(e.target.result);
          console.log(this.urls.length);
        };
      }
      this.selectedFiles = Array.from(event.target.files);
    } else {
      this.selectedFiles = [];
    }

    console.log(this.selectedFiles);
  }
}
