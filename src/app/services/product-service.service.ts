import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../dtos/productDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlGetAll: string =
    'http://localhost:8080/ShopBookPTD/api/v1/products';

  constructor(private http: HttpClient) {}
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

  getProductByIds(Ids: number[]) {
    const params = new HttpParams().set('ids', Ids.join(','));
    return this.http.get<any>(
      'http://localhost:8080/ShopBookPTD/api/v1/products/byIds',
      { params }
    );
  }
}
