import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AcInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and append 'ac' to the URL
    const modifiedReq = req.clone({
      url: req.url + 'ac'
    });
    console.log('AcInterceptor modified URL:', modifiedReq.url);
    return next.handle(modifiedReq);
  }
}
