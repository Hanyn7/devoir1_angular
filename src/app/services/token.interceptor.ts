import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const toExclude = ['/login', '/register','/verify']; 

    const excludeEndpoint = toExclude.some(endpoint => request.url.includes(endpoint));

    if (!excludeEndpoint) {
      const jwt = this.authService.getToken();
      
      if (jwt) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${jwt}` }
        });
      }
    }

    return next.handle(request);
  }
}
