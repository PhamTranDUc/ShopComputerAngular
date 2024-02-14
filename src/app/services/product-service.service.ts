import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../dtos/productDto';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public urlGetAll: string =
    'http://localhost:8080/ShopBookPTD/api/v1/products';

  constructor(private http: HttpClient, private router : Router) {}
  getAll(size: number, page: number): Observable<ProductDto[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', size.toString());
    return this.http.get<any[]>(this.urlGetAll, { params });
  }
  getProductDetail(id: number): Observable<ProductDto> {
    return this.http.get<any>(
      `http://localhost:8080/ShopBookPTD/api/v1/products/` + id
    );
  }

  // deleteProductById(id: number) {
  //   this.http.delete<any>(
  //     'http://localhost:8080/ShopBookPTD/api/v1/products/' + id
  //   ).subscribe({
  //     next: () => {
  //       this.router.navigate(['/admin/products']);
  //       alert('Delete product id = ' + id + ' success !!!');
  //     },
  //     complete: () => {},
  //     error: (error: any) => {
  //       alert('Error Delete product: ');
  //       console.error(error);
  //     },
  //   });
  // }

  deleteProductById(id: number): Observable<any> {
    return this.http.delete<any>(
      'http://localhost:8080/ShopBookPTD/api/v1/products/' + id
    ).pipe(
      tap(() => {
        // this.router.navigate(['/admin/products']); // Chuyển trang trong service
      }),
      catchError(error => {
        // Xử lý lỗi
        return throwError(error);
      })
    );
  }
  getProductByIds(Ids: number[]) {
    const params = new HttpParams().set('ids', Ids.join(','));
    return this.http.get<any>(
      'http://localhost:8080/ShopBookPTD/api/v1/products/byIds',
      { params }
    );
  }

  // deleteProductById(id: number) {
  //   return this.http.delete<any>(
  //     'http://localhost:8080/ShopBookPTD/api/v1/products/' + id
  //   );
  // }
}
