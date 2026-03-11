import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacade } from '../../services/products-facade';
import { ProductForm } from '../../components/product-form/product-form';

@Component({
  selector: 'app-product-create-page',
  imports: [ProductForm],
  templateUrl: './product-create-page.html',
  styleUrl: './product-create-page.css',
})
export class ProductCreatePage {
   private readonly router = inject(Router);
  readonly facade = inject(ProductsFacade);

  onSubmit(formValue: any): void {
    this.facade.createProduct(formValue, () => {
      this.router.navigate(['/products']);
    });
  }
}
