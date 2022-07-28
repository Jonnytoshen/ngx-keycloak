import { Inject, Injectable } from '@angular/core';
import { 
  KeycloakLoginOptions, 
  KeycloakLogoutOptions, 
  KeycloakProfile, 
} from 'keycloak-js';
import { 
  BehaviorSubject, 
  filter, 
  map, 
  Observable, 
  of, 
  share, 
  tap, 
  throwError 
} from 'rxjs';
import { 
  KEYCLOAK_LOGIN_OPTIONS,
  KEYCLOAK_LOGOUT_OPTIONS,
  KEYCLOAK_REGISTER_OPTIONS ,
  KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS,
  KeycloakCustomOptions
} from '../keycloak.options';
import { KeycloakInternalService } from './keycloak-internal.service';

@Injectable()
export class KeycloakService {

  protected userProfile: KeycloakProfile | null = null;
  protected token$ = new BehaviorSubject<string|null>(null);

  constructor(
    @Inject(KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS)
    protected readonly customOptions: KeycloakCustomOptions,
    @Inject(KEYCLOAK_LOGIN_OPTIONS) 
    protected readonly loginOptions: KeycloakLoginOptions,
    @Inject(KEYCLOAK_LOGOUT_OPTIONS) 
    protected readonly logoutOptions: KeycloakLogoutOptions,
    @Inject(KEYCLOAK_REGISTER_OPTIONS) 
    protected readonly registerOptions: Omit<KeycloakLoginOptions, "action">,
    protected readonly keycloak: KeycloakInternalService
  ) { 
    // load user profile when `loadUserProfileAtInit` option is true
    if (this.isAuthenticated() && this.customOptions.loadUserProfileAtInit) {
      this.keycloak.loadUserProfile().subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    }
    this.publishToken();
  }

  tokenChange(): Observable<string> {
    return this.token$
      .pipe(
        filter(value => !!value),
        map(value => value!),
        share()
      );
  }

  getToken(): string | null {
    return this.keycloak.token || null;
  }

  getTokenType(): string | null {
    return this.keycloak.tokenParsed ? this.keycloak.tokenParsed['typ'] : null;
  }

  isAuthenticated(): boolean {
    return !!this.keycloak.authenticated;
  }

  login(): Observable<void> {
    return this.keycloak.login(this.loginOptions);
  }

  logout(): Observable<void> {
    return this.keycloak.logout(this.logoutOptions);
  }

  register(): Observable<void> {
    return this.keycloak.register(this.registerOptions);
  }

  refreshToken(): Observable<boolean> {
    return this.keycloak.updateToken(5)
      .pipe(
        tap(refreshed => refreshed && this.publishToken())
      );
  }

  getUserProfile(forceReload: boolean = false): Observable<KeycloakProfile | null> {
    if (this.userProfile && !forceReload) {
      return of(this.userProfile);
    }

    if (!this.isAuthenticated()) {
      return throwError(() => new Error('The user profile was not loaded as the user is not logged in.'));
    }

    return this.keycloak.loadUserProfile().pipe(tap(userProfile => this.userProfile = userProfile));
  }

  getUserRoles(allRoles: boolean = true): string[] {
    const roles: string[] = [];
    const resourceAccess = this.keycloak.resourceAccess;
    const realmAccess = this.keycloak.realmAccess;

    if (resourceAccess) {
      for (const key in resourceAccess) {
        if (Object.prototype.hasOwnProperty.call(resourceAccess, key)) {
          const clientRoles = resourceAccess[key]['roles'] || [];
          roles.push(...clientRoles);
        }
      }
    }

    if (allRoles && realmAccess) {
      const realmRoles = realmAccess['roles'] || [];
      roles.push(...realmRoles);
    }

    return roles;
  }

  userInRole(role: string, resource?: string): boolean {
    let hasRole = this.keycloak.hasResourceRole(role, resource);
    if (!hasRole) {
      hasRole = this.keycloak.hasRealmRole(role);
    }
    return hasRole;
  }

  protected publishToken(): void {
    this.token$.next(this.getToken());
  }
}
