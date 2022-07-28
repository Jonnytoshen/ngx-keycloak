import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakService } from '../services';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthGuard implements CanActivate {

  constructor(
    protected readonly keycloakService: KeycloakService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const isAuthenticated = this.keycloakService.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      return this.keycloakService.login().pipe(map(() => false));
    }
  }
  
}
