import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductModal } from './delete-product-modal';

describe('DeleteProductModal', () => {
  let component: DeleteProductModal;
  let fixture: ComponentFixture<DeleteProductModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteProductModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm', () => {
    const spy = vi.spyOn(component.confirm, 'emit');

    component.confirm.emit();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit cancel', () => {
    const spy = vi.spyOn(component.cancel, 'emit');

    component.cancel.emit();

    expect(spy).toHaveBeenCalled();
  });

  it('should receive input values', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('productName', 'Producto Test');

    fixture.detectChanges();

    expect(component.isOpen).toBe(true);
    expect(component.productName).toBe('Producto Test');
  });
});
