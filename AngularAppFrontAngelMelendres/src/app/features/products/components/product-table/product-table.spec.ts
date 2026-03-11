import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ProductTable } from './product-table';
import { Product } from '../../models/product';

describe('ProductTable', () => {
  let component: ProductTable;
  let fixture: ComponentFixture<ProductTable>;

  const mockProducts: Product[] = [
    {
      id: 'p1',
      name: 'Producto Uno',
      description: 'Descripción del producto uno',
      logo: 'logo1.png',
      date_release: '2026-03-11',
      date_revision: '2027-03-11',
    },
    {
      id: 'p2',
      name: 'Tarjeta Visa',
      description: 'Descripción del producto dos',
      logo: 'logo2.png',
      date_release: '2026-04-01',
      date_revision: '2027-04-01',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTable);
    component = fixture.componentInstance;

    component.products = mockProducts;
    component.resultsCount = 2;
    component.pageSize = 5;
    component.loading = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return product id in trackById', () => {
    const result = component.trackById(0, mockProducts[0]);

    expect(result).toBe('p1');
  });

  it('should emit selected page size', () => {
    const spy = vi.spyOn(component.pageSizeChange, 'emit');

    const event = {
      target: {
        value: '10',
      },
    } as unknown as Event;

    component.onPageSizeSelect(event);

    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should return initials for two-word name', () => {
    expect(component.getInitials('Tarjeta Visa')).toBe('TV');
  });

  it('should return initials for single-word name', () => {
    expect(component.getInitials('Producto')).toBe('P');
  });

  it('should ignore extra spaces when generating initials', () => {
    expect(component.getInitials('  Tarjeta   Visa  ')).toBe('TV');
  });

  it('should render product rows', () => {
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should render results count', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('2');
  });
});
