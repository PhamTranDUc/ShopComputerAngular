import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category-service.service';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const urlAddProduct : string ='http://localhost:8080/ShopBookPTD/api/v1/products';
    const dataProduct={
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
      "thumbnail" : "",
      "category_id": this.categorrId
    }
    const headers= new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(urlAddProduct, dataProduct, {headers}).subscribe({
      next: (response: any)=>{
        alert("Add product success !!!");
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Cannot add product, error: ${error.error}`);
      },
    })

  }
}
