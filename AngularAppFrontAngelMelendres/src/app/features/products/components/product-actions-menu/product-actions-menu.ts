import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { Product } from '../../models/product';
@Component({
  selector: 'app-product-actions-menu',
  imports: [CommonModule],
  templateUrl: './product-actions-menu.html',
  styleUrl: './product-actions-menu.css',
})
export class ProductActionsMenu {
   @Input({ required: true }) product!: Product;

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  readonly open = signal(false);

  toggleMenu(): void {
    this.open.update(value => !value);
  }

  onEdit(): void {
    this.edit.emit(this.product);
    this.open.set(false);
  }

  onDelete(): void {
    this.delete.emit(this.product);
    this.open.set(false);
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.open.set(false);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
