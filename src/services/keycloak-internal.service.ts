import { Inject, Injectable } from '@angular/core';
import Keycloak, { 
  KeycloakAccountOptions, 
  KeycloakConfig, 
  KeycloakError, 
  KeycloakFlow, 
  KeycloakInitOptions, 
  KeycloakLoginOptions, 
  KeycloakProfile, 
  KeycloakResourceAccess, 
  KeycloakResponseMode, 
  KeycloakResponseType, 
  KeycloakRoles, 
  KeycloakTokenParsed
} from 'keycloak-js';

import {
  KEYCLOAK_CONFIG
} from '../keycloak.options';
import { from, Observable, Subject } from 'rxjs';

@Injectable()
export class KeycloakInternalService {

  protected readonly instance: Keycloak;
  // Keycloak events
  onReady$ = new Subject<boolean|undefined>();
  onAuthSuccess$ = new Subject<void>();
  onAuthError$ = new Subject<KeycloakError>();
  onAuthRefreshSuccess$ = new Subject<void>();
  onAuthRefreshError$ = new Subject<void>();
  onAuthLogout$ = new Subject<void>();
  onTokenExpired$ = new Subject<void>();

  get authenticated(): boolean | undefined {
    return this.instance.authenticated;
  }

  get token(): string | undefined {
    return this.instance.token;
  }

  get tokenParsed(): KeycloakTokenParsed | undefined {
    return this.instance.tokenParsed;
  }

  get subject(): string | undefined {
    return this.instance.subject;
  }

  get idToken(): string | undefined {
    return this.instance.idToken;
  }

  get idTokenParsed(): KeycloakTokenParsed | undefined {
    return this.instance.idTokenParsed;
  }

  get realmAccess(): KeycloakRoles | undefined {
    return this.instance.realmAccess;
  }

  get resourceAccess(): KeycloakResourceAccess | undefined {
    return this.instance.resourceAccess;
  }

  get refreshToken(): string | undefined {
    return this.instance.refreshToken;
  }

  get refreshTokenParsed(): KeycloakTokenParsed | undefined {
    return this.instance.refreshTokenParsed;
  }

  get timeSkew(): number | undefined {
    return this.instance.timeSkew;
  }

  get responseMode(): KeycloakResponseMode | undefined {
    return this.instance.responseMode;
  }

  get flow(): KeycloakFlow | undefined {
    return this.instance.flow;
  }

  get responseType(): KeycloakResponseType | undefined {
    return this.instance.responseType;
  }

  constructor(
    @Inject(KEYCLOAK_CONFIG) 
    protected readonly options: KeycloakConfig
  ) { 
    this.instance = new Keycloak(options);
    this.instance.onReady = authenticated => this.onReady$.next(authenticated);
    this.instance.onAuthSuccess = () => this.onAuthSuccess$.next();
    this.instance.onAuthError = errorData => this.onAuthError$.next(errorData);
    this.instance.onAuthRefreshSuccess = () => this.onAuthRefreshSuccess$.next();
    this.instance.onAuthRefreshError = () => this.onAuthRefreshError$.next();
    this.instance.onAuthLogout = () => this.onAuthLogout$.next();
    this.instance.onTokenExpired = () => this.onTokenExpired$.next();
  }

  init(options: KeycloakInitOptions): Observable<boolean> {
    return from(this.instance.init(options));
  }

  login(options?: KeycloakLoginOptions): Observable<void> {
    return from(this.instance.login(options));
  }

  createLoginUrl(options?: KeycloakLoginOptions): string {
    return this.instance.createLoginUrl(options);
  }

  logout(options?: KeycloakLoginOptions): Observable<void> {
    return from(this.instance.logout(options));
  }

  createLogoutUrl(options?: KeycloakLoginOptions): string {
    return this.instance.createLogoutUrl(options);
  }

  register(options?: Omit<KeycloakLoginOptions, 'action'>): Observable<void> {
    return from(this.instance.register(options));
  }

  createRegisterUrl(options?: Omit<KeycloakLoginOptions, 'action'>): string {
    return this.instance.createRegisterUrl(options);
  }

  accountManagement(): Observable<void> {
    return from(this.instance.accountManagement());
  }

  createAccountUrl(options?: KeycloakAccountOptions): string {
    return this.instance.createAccountUrl(options);
  }

  hasRealmRole(role: string): boolean {
    return this.instance.hasRealmRole(role);
  }

  hasResourceRole(role: string, resource?: string): boolean {
    return this.instance.hasResourceRole(role, resource);
  }

  loadUserProfile(): Observable<KeycloakProfile> {
    return from(this.instance.loadUserProfile());
  }

  isTokenExpired(minValidity?: number): boolean {
    return this.instance.isTokenExpired(minValidity);
  }

  updateToken(minValidity: number): Observable<boolean> {
    return from(this.instance.updateToken(minValidity));
  }

  clearToken(): void {
    this.instance.clearToken();
  }
}
