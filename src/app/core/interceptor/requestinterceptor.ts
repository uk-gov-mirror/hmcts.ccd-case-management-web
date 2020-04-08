import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class RequestInterceptor  implements HttpInterceptor {

constructor(@Optional() @Inject('serverUrl') protected serverUrl: string) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('In intercept Method <<>> ' + this.serverUrl);
    const serverReq = !this.serverUrl
      ? req
      : req.clone({
          url: `${this.serverUrl}${req.url}`
        });
    console.log('In intercept Method End');
    return next.handle(serverReq);
  }
}
