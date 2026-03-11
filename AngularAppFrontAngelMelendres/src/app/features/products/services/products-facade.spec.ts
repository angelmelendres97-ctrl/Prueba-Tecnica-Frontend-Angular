import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProductsFacade } from './products-facade';
import { ProductsApi } from './products-api';

describe('ProductsFacade', () => {
  let facade: ProductsFacade;
  let api: ProductsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    facade = TestBed.inject(ProductsFacade);
    api = TestBed.inject(ProductsApi);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should load products into state', () => {
    vi.spyOn(api, 'getProducts').mockReturnValue(
      of({
        data: [
          {
            id: 'p1',
            name: 'Producto 1',
            description: 'Descripción producto 1',
            logo: 'logo.png',
            date_release: '2026-03-11',
            date_revision: '2027-03-11',
          },
        ],
      })
    );

    facade.loadProducts();

    expect(facade.products().length).toBe(1);
    expect(facade.products()[0].id).toBe('p1');
  });

  it('should set search term', () => {
    facade.setSearchTerm('visa');
    expect(facade.searchTerm()).toBe('visa');
  });

  it('should set page size', () => {
    facade.setPageSize(10);
    expect(facade.pageSize()).toBe(10);
  });

  it('should set selected product', () => {
    const product = {
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto 1',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    };

    facade.setSelectedProduct(product);
    expect(facade.selectedProduct()).toEqual(product);
  });

  it('should get product by id', () => {
    facade.products.set([
      {
        id: 'p1',
        name: 'Producto 1',
        description: 'Descripción producto 1',
        logo: 'logo.png',
        date_release: '2026-03-11',
        date_revision: '2027-03-11',
      },
    ]);

    const result = facade.getProductById('p1');

    expect(result?.id).toBe('p1');
  });

  it('should create product and call success callback', () => {
    const loadSpy = vi.spyOn(facade, 'loadProducts').mockImplementation(() => {});
    const success = vi.fn();

    vi.spyOn(api, 'createProduct').mockReturnValue(of({ message: 'ok' }));

    facade.createProduct(
      {
        id: 'p2',
        name: 'Producto 2',
        description: 'Descripción producto 2',
        logo: 'logo.png',
        date_release: '2026-03-11',
        date_revision: '2027-03-11',
      },
      success
    );

    expect(api.createProduct).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
    expect(success).toHaveBeenCalled();
  });

  it('should update product and call success callback', () => {
    const loadSpy = vi.spyOn(facade, 'loadProducts').mockImplementation(() => {});
    const success = vi.fn();

    vi.spyOn(api, 'updateProduct').mockReturnValue(of({ message: 'ok' }));

    facade.updateProduct(
      'p1',
      {
        name: 'Producto actualizado',
        description: 'Descripción actualizada',
        logo: 'logo.png',
        date_release: '2026-03-11',
        date_revision: '2027-03-11',
      },
      success
    );

    expect(api.updateProduct).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
    expect(success).toHaveBeenCalled();
  });

  it('should delete product and call success callback', () => {
    const loadSpy = vi.spyOn(facade, 'loadProducts').mockImplementation(() => {});
    const success = vi.fn();

    vi.spyOn(api, 'deleteProduct').mockReturnValue(of({ message: 'ok' }));

    facade.deleteProduct('p1', success);

    expect(api.deleteProduct).toHaveBeenCalledWith('p1');
    expect(loadSpy).toHaveBeenCalled();
    expect(success).toHaveBeenCalled();
  });
});
