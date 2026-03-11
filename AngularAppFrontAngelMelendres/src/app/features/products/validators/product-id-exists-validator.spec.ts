import { FormControl, ValidationErrors } from '@angular/forms';
import { of, throwError, firstValueFrom, isObservable } from 'rxjs';
import { productIdExistsValidator } from './product-id-exists-validator';
import { vi } from 'vitest';

describe('productIdExistsValidator', () => {
  let apiMock: {
    verifyProductId: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    apiMock = {
      verifyProductId: vi.fn(),
    };
  });

  async function resolveValidatorResult(
    controlValue: string
  ): Promise<ValidationErrors | null> {
    const validator = productIdExistsValidator(apiMock as any);
    const control = new FormControl(controlValue);
    const result = validator(control);

    if (isObservable(result)) {
      return await firstValueFrom(result);
    }

    return await result;
  }

  it('debe retornar null si el control está vacío', async () => {
    const result = await resolveValidatorResult('');

    expect(result).toBeNull();
    expect(apiMock.verifyProductId).not.toHaveBeenCalled();
  });

  it('debe retornar error si el id ya existe', async () => {
    apiMock.verifyProductId.mockReturnValue(of(true));

    const result = await resolveValidatorResult('trj-001');

    expect(apiMock.verifyProductId).toHaveBeenCalledWith('trj-001');
    expect(result).toEqual({ productIdExists: true });
  });

  it('debe retornar null si el id no existe', async () => {
    apiMock.verifyProductId.mockReturnValue(of(false));

    const result = await resolveValidatorResult('trj-002');

    expect(apiMock.verifyProductId).toHaveBeenCalledWith('trj-002');
    expect(result).toBeNull();
  });

  it('debe retornar null si la api falla', async () => {
    apiMock.verifyProductId.mockReturnValue(
      throwError(() => new Error('API error'))
    );

    const result = await resolveValidatorResult('trj-003');

    expect(result).toBeNull();
  });
});
