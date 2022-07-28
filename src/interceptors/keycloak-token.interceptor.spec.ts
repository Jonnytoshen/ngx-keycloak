import { TestBed } from '@angular/core/testing';

import { KeycloakTokenInterceptor } from './keycloak-token.interceptor';

describe('KeycloakTokenInterceptor', () => {
  let service: KeycloakTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakTokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
