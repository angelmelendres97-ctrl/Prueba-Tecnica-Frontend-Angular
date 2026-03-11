import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ProductActionsMenu } from './product-actions-menu';

describe('ProductActionsMenu', () => {
  let component: ProductActionsMenu;
  let fixture: ComponentFixture<ProductActionsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductActionsMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionsMenu);
    component = fixture.componentInstance;

    component.product = {
      id: 'p1',
      name: 'Producto 1',
      description: 'Descripción producto',
      logo: 'logo.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    };

    fixture.detectChanges();
  });

  it('should toggle menu when clicking trigger', () => {
    const button = fixture.nativeElement.querySelector('.menu__trigger');

    button.click();
    fixture.detectChanges();

    expect(component.open()).toBe(true);
  });

  it('should emit edit when clicking edit button', () => {
    const spy = vi.spyOn(component.edit, 'emit');

    component.open.set(true);
    fixture.detectChanges();

    const editBtn = fixture.nativeElement.querySelector(
      '.menu__dropdown button:first-child'
    );

    editBtn.click();

    expect(spy).toHaveBeenCalledWith(component.product);
  });

  it('should emit delete when clicking delete button', () => {
    const spy = vi.spyOn(component.delete, 'emit');

    component.open.set(true);
    fixture.detectChanges();

    const deleteBtn = fixture.nativeElement.querySelector(
      '.menu__dropdown button:last-child'
    );

    deleteBtn.click();

    expect(spy).toHaveBeenCalledWith(component.product);
  });

  it('should stop propagation', () => {
    const event = {
      stopPropagation: vi.fn(),
    } as unknown as Event;

    component.stopPropagation(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
