import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
