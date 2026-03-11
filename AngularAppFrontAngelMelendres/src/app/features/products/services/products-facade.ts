import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductsApi } from './products-api';
import { finalize } from 'rxjs';
import { CreateProductRequest, UpdateProductRequest } from '../models/product-request';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  private readonly api = inject(ProductsApi);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly searchTerm = signal('');
  readonly pageSize = signal(5);
  readonly selectedProduct = signal<Product | null>(null);

  readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) return this.products();

    return this.products().filter(product =>
      product.id.toLowerCase().includes(term) ||
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  });

  readonly visibleProducts = computed(() =>
    this.filteredProducts().slice(0, this.pageSize())
  );

  readonly resultsCount = computed(() => this.visibleProducts().length);

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api
      .getProducts()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          this.products.set(response.data ?? []);
        },
        error: error => {
          this.error.set(error?.error?.message || 'No se pudieron cargar los productos');
        },
      });
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
  }

  setSelectedProduct(product: Product | null): void {
    this.selectedProduct.set(product);
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(product => product.id === id);
  }

  createProduct(payload: CreateProductRequest, onSuccess?: () => void): void {
    this.loading.set(true);
    this.error.set(null);

    this.api
      .createProduct(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadProducts();
          onSuccess?.();
        },
        error: error => {
          this.error.set(error?.error?.message || 'No se pudo crear el producto');
        },
      });
  }

  updateProduct(
    id: string,
    payload: UpdateProductRequest,
    onSuccess?: () => void
  ): void {
    this.loading.set(true);
    this.error.set(null);

    this.api
      .updateProduct(id, payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadProducts();
          onSuccess?.();
        },
        error: error => {
          this.error.set(error?.error?.message || 'No se pudo actualizar el producto');
        },
      });
  }

  deleteProduct(id: string, onSuccess?: () => void): void {
    this.loading.set(true);
    this.error.set(null);

    this.api
      .deleteProduct(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.loadProducts();
          onSuccess?.();
        },
        error: error => {
          this.error.set(error?.error?.message || 'No se pudo eliminar el producto');
        },
      });
  }
}
