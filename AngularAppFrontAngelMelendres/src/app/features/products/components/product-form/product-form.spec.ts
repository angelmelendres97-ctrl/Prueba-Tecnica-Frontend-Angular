import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ProductForm } from './product-form';
import { ProductsApi } from '../../services/products-api';

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductForm],
      providers: [
        {
          provide: ProductsApi,
          useValue: {
            verifyProductId: vi.fn().mockReturnValue(of(false)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit when form is valid', () => {
    const spy = vi.spyOn(component.formSubmit, 'emit');

    component.form.patchValue({
      id: 'abc123',
      name: 'Producto prueba',
      description: 'Descripción suficientemente larga',
      logo: 'logo.png',
      date_release: '2026-03-20',
      date_revision: '2027-03-20',
    });

    component.submit();

    expect(spy).toHaveBeenCalled();
  });

  it('should set date_revision one year after date_release', () => {
    component.form.patchValue({
      date_release: '2026-03-20',
    });

    component.onReleaseDateChange();

    expect(component.form.get('date_revision')?.value).toBe('2027-03-20');
  });

  it('should reset form to default values in create mode', () => {
    component.mode = 'create';

    component.form.patchValue({
      id: 'abc123',
      name: 'Producto prueba',
      description: 'Descripción suficientemente larga',
      logo: 'logo.png',
      date_release: '2026-03-20',
      date_revision: '2027-03-20',
    });

    component.resetForm();

    expect(component.form.get('id')?.value).toBe('');
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('logo')?.value).toBeTruthy();
    expect(component.form.get('date_release')?.value).toBe('');
    expect(component.form.get('date_revision')?.value).toBe('');
  });

  it('should reset form with product values in edit mode', () => {
    component.mode = 'edit';
    component.product = {
      id: 'p1',
      name: 'Producto editado',
      description: 'Descripción del producto editado',
      logo: 'logo-edit.png',
      date_release: '2026-03-20',
      date_revision: '2027-03-20',
    };

    component.resetForm();

    expect(component.form.get('id')?.value).toBe('p1');
    expect(component.form.get('name')?.value).toBe('Producto editado');
    expect(component.form.get('description')?.value).toBe('Descripción del producto editado');
    expect(component.form.get('logo')?.value).toBe('logo-edit.png');
    expect(component.form.get('date_release')?.value).toBe('2026-03-20');
    expect(component.form.get('date_revision')?.value).toBe('2027-03-20');
  });

  it('should return required error message', () => {
    component.form.get('name')?.setErrors({ required: true });

    expect(component.getErrorMessage('name')).toBe('Este campo es requerido');
  });

  it('should return minlength error message', () => {
    component.form.get('name')?.setErrors({
      minlength: { requiredLength: 5, actualLength: 2 },
    });

    expect(component.getErrorMessage('name')).toBe('Mínimo 5 caracteres');
  });

  it('should return maxlength error message', () => {
    component.form.get('name')?.setErrors({
      maxlength: { requiredLength: 100, actualLength: 120 },
    });

    expect(component.getErrorMessage('name')).toBe('Máximo 100 caracteres');
  });

  it('should return productIdExists error message', () => {
    component.form.get('id')?.setErrors({ productIdExists: true });

    expect(component.getErrorMessage('id')).toBe('ID no válido!');
  });

  it('should return minToday error message', () => {
    component.form.get('date_release')?.setErrors({ minToday: true });

    expect(component.getErrorMessage('date_release')).toBe(
      'La fecha debe ser igual o mayor a hoy'
    );
  });

  it('should return empty string when control has no errors', () => {
    component.form.get('name')?.setErrors(null);

    expect(component.getErrorMessage('name')).toBe('');
  });
});
