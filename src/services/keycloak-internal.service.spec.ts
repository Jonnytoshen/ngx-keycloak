import { TestBed } from '@angular/core/testing';

import { KeycloakInternalService } from './keycloak-internal.service';

describe('KeycloakInternalService', () => {
  let service: KeycloakInternalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakInternalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
