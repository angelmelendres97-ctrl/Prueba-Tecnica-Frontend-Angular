import { FormControl, FormGroup } from '@angular/forms';
import { revisionDateValidator } from './revision-date-validator';

describe('revisionDateValidator', () => {
  it('debe retornar null si la fecha_revision es exactamente un año posterior', () => {
    const form = new FormGroup(
      {
        date_release: new FormControl('2026-03-11'),
        date_revision: new FormControl('2027-03-11'),
      },
      { validators: revisionDateValidator() }
    );

    expect(form.errors).toBeNull();
  });

  it('debe retornar error si la fecha_revision no es exactamente un año posterior', () => {
    const form = new FormGroup(
      {
        date_release: new FormControl('2026-03-11'),
        date_revision: new FormControl('2027-03-10'),
      },
      { validators: revisionDateValidator() }
    );

    expect(form.errors).toEqual({ invalidRevisionDate: true });
  });
});
