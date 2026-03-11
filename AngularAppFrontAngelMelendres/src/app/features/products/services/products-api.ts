import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductMessageResponse, ProductsResponse } from '../models/product-response';
import { Product } from '../models/product';
import { CreateProductRequest, UpdateProductRequest } from '../models/product-request';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/bp/products`;

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  verifyProductId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verification/${id}`);
  }

  createProduct(payload: CreateProductRequest): Observable<ProductMessageResponse> {
    return this.http.post<ProductMessageResponse>(this.baseUrl, payload);
  }

  updateProduct(
    id: string,
    payload: UpdateProductRequest
  ): Observable<ProductMessageResponse> {
    return this.http.put<ProductMessageResponse>(`${this.baseUrl}/${id}`, payload);
  }

  deleteProduct(id: string): Observable<ProductMessageResponse> {
    return this.http.delete<ProductMessageResponse>(`${this.baseUrl}/${id}`);
  }

}
