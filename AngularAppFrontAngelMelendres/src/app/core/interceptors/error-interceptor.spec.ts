import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { throwError, firstValueFrom } from 'rxjs';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should propagate http errors', async () => {
    const req = new HttpRequest('GET', '/test');

    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error',
    });

    const next: HttpHandlerFn = () => throwError(() => error);

    const resultPromise = TestBed.runInInjectionContext(() =>
      firstValueFrom(errorInterceptor(req, next))
    );

    await expect(resultPromise).rejects.toBe(error);
  });
});
