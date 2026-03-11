import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacade } from '../../services/products-facade';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductSearch } from '../../components/product-search/product-search';
import { ProductTable } from '../../components/product-table/product-table';
import { DeleteProductModal } from '../../components/delete-product-modal/delete-product-modal';

@Component({
  selector: 'app-product-list-page',
  imports: [
    CommonModule,
    ProductSearch,
    ProductTable,
    DeleteProductModal,
  ],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css',
})
export class ProductListPage implements OnInit {
  private readonly router = inject(Router);
  readonly facade = inject(ProductsFacade);

  readonly productToDelete = signal<Product | null>(null);
  readonly modalOpen = signal(false);

  ngOnInit(): void {
    this.facade.loadProducts();
  }

  onSearch(term: string): void {
    this.facade.setSearchTerm(term);
  }

  onPageSizeChange(size: number): void {
    this.facade.setPageSize(size);
  }

  goToCreate(): void {
    this.router.navigate(['/products/new']);
  }

  onEdit(product: Product): void {
    this.router.navigate(['/products', product.id, 'edit']);
  }

  onDeleteClick(product: Product): void {
    this.productToDelete.set(product);
    this.modalOpen.set(true);
  }

  onCancelDelete(): void {
    this.modalOpen.set(false);
    this.productToDelete.set(null);
  }

  onConfirmDelete(): void {
    const product = this.productToDelete();
    if (!product) return;

    this.facade.deleteProduct(product.id, () => {
      this.modalOpen.set(false);
      this.productToDelete.set(null);
    });
  }
}
