import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductCreatePage } from './product-create-page';
import { ProductsFacade } from '../../services/products-facade';
import { ProductsApi } from '../../services/products-api';
import { vi } from 'vitest';

describe('ProductCreatePage', () => {
  let component: ProductCreatePage;
  let fixture: ComponentFixture<ProductCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCreatePage],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
        {
          provide: ProductsApi,
          useValue: {
            verifyProductId: vi.fn().mockReturnValue(of(false)),
          },
        },
        {
          provide: ProductsFacade,
          useValue: {
            createProduct: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
