import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProductEditPage } from './product-edit-page';
import { ProductsFacade } from '../../services/products-facade';
import { ProductsApi } from '../../services/products-api';
import { Product } from '../../models/product';

describe('ProductEditPage', () => {
  let component: ProductEditPage;
  let fixture: ComponentFixture<ProductEditPage>;

  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  let facadeMock: {
    getProductById: ReturnType<typeof vi.fn>;
    loadProducts: ReturnType<typeof vi.fn>;
    updateProduct: ReturnType<typeof vi.fn>;
  };

  const mockProduct: Product = {
    id: 'test-id',
    name: 'Producto test',
    description: 'Descripción del producto test',
    logo: 'https://test.com/logo.png',
    date_release: '2026-03-11',
    date_revision: '2027-03-11',
  };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    facadeMock = {
      getProductById: vi.fn().mockReturnValue(mockProduct),
      loadProducts: vi.fn(),
      updateProduct: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductEditPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'test-id' : null),
              },
            },
          },
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: ProductsApi,
          useValue: {
            verifyProductId: vi.fn().mockReturnValue(of(false)),
          },
        },
        {
          provide: ProductsFacade,
          useValue: facadeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set product on init when product exists', () => {
    facadeMock.getProductById.mockReturnValue(mockProduct);

    component.ngOnInit();

    expect(facadeMock.getProductById).toHaveBeenCalledWith('test-id');
    expect(component.product()).toEqual(mockProduct);
    expect(facadeMock.loadProducts).not.toHaveBeenCalled();
  });

  it('should return if route id is null', () => {
    const route = TestBed.inject(ActivatedRoute) as any;
    route.snapshot.paramMap.get = vi.fn().mockReturnValue(null);

    component.ngOnInit();

    expect(facadeMock.getProductById).not.toHaveBeenCalled();
    expect(facadeMock.loadProducts).not.toHaveBeenCalled();
  });

  it('should call loadProducts when product does not exist initially and then set product', () => {
    vi.useFakeTimers();

    facadeMock.getProductById
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(mockProduct);

    component.ngOnInit();

    expect(facadeMock.loadProducts).toHaveBeenCalled();

    vi.advanceTimersByTime(400);

    expect(component.product()).toEqual(mockProduct);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /products when product is still missing after timeout', () => {
    vi.useFakeTimers();

    facadeMock.getProductById
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(undefined);

    component.ngOnInit();

    expect(facadeMock.loadProducts).toHaveBeenCalled();

    vi.advanceTimersByTime(400);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should not submit when there is no selected product', () => {
    component.product.set(null);

    component.onSubmit({
      name: 'Nuevo nombre',
      description: 'Nueva descripción',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    });

    expect(facadeMock.updateProduct).not.toHaveBeenCalled();
  });

  it('should call updateProduct and navigate on submit', () => {
    component.product.set(mockProduct);

    facadeMock.updateProduct.mockImplementation(
      (_id: string, _payload: any, onSuccess?: () => void) => {
        onSuccess?.();
      }
    );

    component.onSubmit({
      name: 'Nuevo nombre',
      description: 'Nueva descripción',
      logo: 'nuevo-logo.png',
      date_release: '2026-04-01',
      date_revision: '2027-04-01',
    });

    expect(facadeMock.updateProduct).toHaveBeenCalledWith(
      'test-id',
      {
        name: 'Nuevo nombre',
        description: 'Nueva descripción',
        logo: 'nuevo-logo.png',
        date_release: '2026-04-01',
        date_revision: '2027-04-01',
      },
      expect.any(Function)
    );

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });
});
