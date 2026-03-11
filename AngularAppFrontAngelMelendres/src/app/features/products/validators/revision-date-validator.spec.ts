import { TestBed } from '@angular/core/testing';

import { RevisionDateValidator } from './revision-date-validator';

describe('RevisionDateValidator', () => {
  let service: RevisionDateValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionDateValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
