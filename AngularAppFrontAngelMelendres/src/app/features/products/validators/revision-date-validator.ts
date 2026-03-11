import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function revisionDateValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const release = group.get('date_release')?.value;
    const revision = group.get('date_revision')?.value;

    if (!release || !revision) {
      return null;
    }

    const releaseDate = new Date(release);
    const expectedRevision = new Date(release);
    expectedRevision.setFullYear(expectedRevision.getFullYear() + 1);

    const revisionDate = new Date(revision);

    const releaseValue = releaseDate.toISOString().slice(0, 10);
    const expectedValue = expectedRevision.toISOString().slice(0, 10);
    const revisionValue = revisionDate.toISOString().slice(0, 10);

    return revisionValue === expectedValue
      ? null
      : { invalidRevisionDate: true };
  };
}
