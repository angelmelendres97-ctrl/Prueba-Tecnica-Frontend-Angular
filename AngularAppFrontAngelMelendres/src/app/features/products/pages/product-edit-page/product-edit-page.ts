import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsFacade } from '../../services/products-facade';
import { Product } from '../../models/product';
import { ProductForm } from '../../components/product-form/product-form';

@Component({
  selector: 'app-product-edit-page',
  imports: [ProductForm],
  templateUrl: './product-edit-page.html',
  styleUrl: './product-edit-page.css',
})
export class ProductEditPage implements OnInit{
   private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly facade = inject(ProductsFacade);

  readonly product = signal<Product | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const existing = this.facade.getProductById(id);
    if (existing) {
      this.product.set(existing);
      return;
    }

    this.facade.loadProducts();

    setTimeout(() => {
      const loaded = this.facade.getProductById(id);
      if (loaded) {
        this.product.set(loaded);
      } else {
        this.router.navigate(['/products']);
      }
    }, 400);
  }

  onSubmit(formValue: any): void {
    const product = this.product();
    if (!product) return;

    this.facade.updateProduct(product.id, {
      name: formValue.name,
      description: formValue.description,
      logo: formValue.logo,
      date_release: formValue.date_release,
      date_revision: formValue.date_revision,
    }, () => {
      this.router.navigate(['/products']);
    });
  }
}
