import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, of, catchError } from 'rxjs';
import { ProductsApi } from '../services/products-api';

export function productIdExistsValidator(api: ProductsApi): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value?.trim();

    if (!value) {
      return of(null);
    }

    return api.verifyProductId(value).pipe(
      map((exists: boolean): ValidationErrors | null =>
        exists ? { productIdExists: true } : null
      ),
      catchError(() => of(null))
    );
  };
}
