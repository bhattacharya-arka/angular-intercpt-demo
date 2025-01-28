import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DcInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and append '-dc' to the URL
    const modifiedReq = req.clone({
      url: req.url + '-dc'
    });
    console.log('DcInterceptor modified URL:', modifiedReq.url);
    return next.handle(modifiedReq);
  }
}
