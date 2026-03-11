import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProductsApi } from './products-api';

describe('ProductsApi', () => {
  let service: ProductsApi;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsApi);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get products', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of({ data: [] }));

    service.getProducts().subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should call http verify product id', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(true));

    service.verifyProductId('p1').subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should call http create product', () => {
    const spy = vi.spyOn(http, 'post').mockReturnValue(of({ message: 'ok' }));

    service.createProduct({
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto 1',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    }).subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should call http update product', () => {
    const spy = vi.spyOn(http, 'put').mockReturnValue(of({ message: 'ok' }));

    service.updateProduct('p1', {
      name: 'Producto actualizado',
      description: 'Descripción actualizada',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    }).subscribe();

    expect(spy).toHaveBeenCalled();
  });

  it('should call http delete product', () => {
    const spy = vi.spyOn(http, 'delete').mockReturnValue(of({ message: 'ok' }));

    service.deleteProduct('p1').subscribe();

    expect(spy).toHaveBeenCalled();
  });
});
