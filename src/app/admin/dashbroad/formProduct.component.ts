import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category-service.service';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-product',
  templateUrl: './formProduct.component.html',
  styleUrl: './formProduct.component.scss',
})
export class FormProduct {
  name: string;
  description: string;
  price: number;
  categorrId: number;
  listCategory: any[] = [];
  public Editor = ClassicEditor;
  public fullName: string = '';
  selectedFiles: any;
  thumbnail: any;
  urls: string[] = [];
  urlThumbnail: any;
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private http: HttpClient
  ) {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.categorrId = 0;
  }
  ngOnInit() {
    this.categoryService.getAll().subscribe((response) => {
      this.listCategory = response;
      console.log(this.listCategory);
    });
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
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
      }
      this.selectedFiles = Array.from(event.target.files);
    } else {
      this.selectedFiles = null;
    }

    console.log(this.selectedFiles);
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
  removeImage(index: number) {
    this.urls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }
}
