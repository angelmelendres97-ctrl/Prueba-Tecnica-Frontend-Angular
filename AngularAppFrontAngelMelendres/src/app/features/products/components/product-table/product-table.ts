import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductActionsMenu } from '../product-actions-menu/product-actions-menu';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, ProductActionsMenu],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
})
export class ProductTable {
  @Input() products: Product[] = [];
  @Input() resultsCount = 0;
  @Input() pageSize = 5;
  @Input() loading = false;

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();

  readonly sizes = [5, 10, 20];

  trackById(index: number, product: Product): string {
    return product.id;
  }

  onPageSizeSelect(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(value);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  }
}
