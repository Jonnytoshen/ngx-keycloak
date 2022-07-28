import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { KeycloakCustomOptions, KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS } from '../keycloak.options';
import { KeycloakService } from '../services';

@Injectable()
export class KeycloakTokenInterceptor implements HttpInterceptor {

  constructor(
    @Inject(KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS)
    protected readonly options: KeycloakCustomOptions,
    protected readonly keycloakService: KeycloakService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldAddToken(req)) {
      const { authorizationHeaderName } = this.options; 
      const tokenType = this.keycloakService.getTokenType() || 'Bearer';
      return this.keycloakService.refreshToken()
        .pipe(
          map(() => this.keycloakService.getToken()),
          switchMap(token => {
            if (token) {
              req = req.clone({
                setHeaders: {
                  [authorizationHeaderName]: [tokenType, token].join(' ')
                }
              });
            }
            return next.handle(req);
          })
        );
    } else {
      return next.handle(req);
    }

  }

  protected shouldAddToken(req: HttpRequest<any>): boolean {
    const { enableTokenInterceptor, tokenInterceptorFilter, tokenInterceptorUrls } = this.options;
    return enableTokenInterceptor && (tokenInterceptorFilter(req) || tokenInterceptorUrls.includes(req.url));
  }
}
