import { TestBed } from '@angular/core/testing';

import { ProductIdExistsValidator } from './product-id-exists-validator';

describe('ProductIdExistsValidator', () => {
  let service: ProductIdExistsValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductIdExistsValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
