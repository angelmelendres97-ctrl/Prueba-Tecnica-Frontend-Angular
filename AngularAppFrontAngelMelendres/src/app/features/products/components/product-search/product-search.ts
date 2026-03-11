import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch {
  @Output() searchChange = new EventEmitter<string>();

  value = '';

  onInput(): void {
    this.searchChange.emit(this.value);
  }
}
