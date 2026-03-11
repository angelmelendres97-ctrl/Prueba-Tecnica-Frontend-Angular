import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-product-modal',
  imports: [CommonModule],
  templateUrl: './delete-product-modal.html',
  styleUrl: './delete-product-modal.css',
})
export class DeleteProductModal {
  @Input() isOpen = false;
  @Input() productName = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
