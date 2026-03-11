import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { vi } from 'vitest';

import { ProductListPage } from './product-list-page';
import { ProductsFacade } from '../../services/products-facade';
import { Product } from '../../models/product';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;

  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  let facadeMock: {
    loadProducts: ReturnType<typeof vi.fn>;
    setSearchTerm: ReturnType<typeof vi.fn>;
    setPageSize: ReturnType<typeof vi.fn>;
    deleteProduct: ReturnType<typeof vi.fn>;
    visibleProducts: ReturnType<typeof signal<Product[]>>;
    resultsCount: ReturnType<typeof signal<number>>;
    pageSize: ReturnType<typeof signal<number>>;
    loading: ReturnType<typeof signal<boolean>>;
    error: ReturnType<typeof signal<string | null>>;
  };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    facadeMock = {
      loadProducts: vi.fn(),
      setSearchTerm: vi.fn(),
      setPageSize: vi.fn(),
      deleteProduct: vi.fn(),
      visibleProducts: signal([]),
      resultsCount: signal(0),
      pageSize: signal(5),
      loading: signal(false),
      error: signal(null),
    };

    await TestBed.configureTestingModule({
      imports: [ProductListPage],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: ProductsFacade,
          useValue: facadeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on init', () => {
    component.ngOnInit();

    expect(facadeMock.loadProducts).toHaveBeenCalled();
  });

  it('should call setSearchTerm on search', () => {
    component.onSearch('visa');

    expect(facadeMock.setSearchTerm).toHaveBeenCalledWith('visa');
  });

  it('should call setPageSize on page size change', () => {
    component.onPageSizeChange(10);

    expect(facadeMock.setPageSize).toHaveBeenCalledWith(10);
  });

  it('should navigate to create page', () => {
    component.goToCreate();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products/new']);
  });

  it('should navigate to edit page', () => {
    const product: Product = {
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto 1',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    };

    component.onEdit(product);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products', 'p1', 'edit']);
  });

  it('should open delete modal on delete click', () => {
    const product: Product = {
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto 1',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    };

    component.onDeleteClick(product);

    expect(component.productToDelete()).toEqual(product);
    expect(component.modalOpen()).toBe(true);
  });

  it('should close delete modal on cancel', () => {
    component.productToDelete.set({
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto 1',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    });
    component.modalOpen.set(true);

    component.onCancelDelete();

    expect(component.productToDelete()).toBeNull();
    expect(component.modalOpen()).toBe(false);
  });

  it('should not delete if there is no selected product', () => {
    component.productToDelete.set(null);

    component.onConfirmDelete();

    expect(facadeMock.deleteProduct).not.toHaveBeenCalled();
  });

  it('should delete selected product and close modal on confirm', () => {
    const product: Product = {
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto 1',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    };

    component.productToDelete.set(product);
    component.modalOpen.set(true);

    facadeMock.deleteProduct.mockImplementation(
      (_id: string, onSuccess?: () => void) => {
        onSuccess?.();
      }
    );

    component.onConfirmDelete();

    expect(facadeMock.deleteProduct).toHaveBeenCalledWith('p1', expect.any(Function));
    expect(component.productToDelete()).toBeNull();
    expect(component.modalOpen()).toBe(false);
  });
});
