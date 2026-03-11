import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product';
import { environment } from '../../../../../environments/environment';
import { revisionDateValidator } from '../../validators/revision-date-validator';
import { productIdExistsValidator } from '../../validators/product-id-exists-validator';
import { ProductsApi } from '../../services/products-api';
@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly productsApi = inject(ProductsApi);
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() product: Product | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  readonly today = new Date().toISOString().slice(0, 10);

  readonly form = this.fb.group(
    {
      id: this.fb.nonNullable.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        asyncValidators: this.mode === 'create'
          ? [productIdExistsValidator(this.productsApi)]
          : [], updateOn: 'blur',
      }),
      name: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: this.fb.nonNullable.control(environment.defaultLogo, [Validators.required]),
      date_release: this.fb.nonNullable.control('', [Validators.required]),
      date_revision: this.fb.nonNullable.control('', [Validators.required]),
    },
    {
      validators: [revisionDateValidator()],
    }
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.form.patchValue({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        logo: this.product.logo,
        date_release: this.product.date_release,
        date_revision: this.product.date_revision,
      });

      this.form.get('id')?.disable();
    } else if (this.mode === 'create') {
      this.form.get('id')?.enable();
      this.form
        .get('id')
        ?.setAsyncValidators([productIdExistsValidator(this.productsApi)]); this.form.get('id')?.updateValueAndValidity();
    }
  }

  onReleaseDateChange(): void {
    const release = this.form.get('date_release')?.value;
    if (!release) return;

    const releaseDate = new Date(release);
    const revisionDate = new Date(releaseDate);
    revisionDate.setFullYear(revisionDate.getFullYear() + 1);

    const minToday = new Date(this.today);

    if (releaseDate < minToday) {
      this.form.get('date_release')?.setErrors({ minToday: true });
    }

    this.form.patchValue({
      date_revision: revisionDate.toISOString().slice(0, 10),
    });

    this.form.updateValueAndValidity();
  }

  resetForm(): void {
    if (this.mode === 'edit' && this.product) {
      this.form.patchValue({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        logo: this.product.logo,
        date_release: this.product.date_release,
        date_revision: this.product.date_revision,
      });
      return;
    }

    this.form.reset({
      id: '',
      name: '',
      description: '',
      logo: environment.defaultLogo,
      date_release: '',
      date_revision: '',
    });
  }

  submit(): void {
    this.form.markAllAsTouched();

    const release = this.form.get('date_release')?.value;
    if (release && release < this.today) {
      this.form.get('date_release')?.setErrors({ minToday: true });
    }

    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    this.formSubmit.emit(raw);
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control?.errors) return '';

    if (control.errors['required']) return 'Este campo es requerido';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['productIdExists']) return 'ID no válido!';
    if (control.errors['minToday']) return 'La fecha debe ser igual o mayor a hoy';

    return 'Campo inválido';
  }
}
