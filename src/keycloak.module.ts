import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

import { 
  KeycloakCustomOptions,
  KeycloakInitOptionsInternal,
  KeycloakOptions, 
  KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS, 
  KEYCLOAK_ANGULAR_LIBRARY_OPTIONS, 
  KEYCLOAK_CONFIG, 
  KEYCLOAK_INIT_OPTIONS,
  KEYCLOAK_LOGIN_OPTIONS,
  KEYCLOAK_LOGOUT_OPTIONS,
  KEYCLOAK_REGISTER_OPTIONS
} from './keycloak.options';
import { 
  KeycloakInternalService, 
  KeycloakService 
} from './services';
import { KeycloakTokenInterceptor } from './interceptors';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class KeycloakModule { 
  static forRoot(options: KeycloakOptions): ModuleWithProviders<KeycloakModule> {
    const { url, realm, clientId, initOptions, loginOptions, logoutOptions, registerOptions, ...customOptions } = options;
    const keycloakConfig: KeycloakConfig = { url, realm, clientId };
    return {
      ngModule: KeycloakModule,
      providers: [
        { provide: KEYCLOAK_ANGULAR_LIBRARY_OPTIONS, useValue: options },
        { provide: KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS, useValue: new KeycloakCustomOptions(customOptions) },
        { provide: KEYCLOAK_CONFIG, useValue: keycloakConfig },
        { provide: KEYCLOAK_INIT_OPTIONS, useValue: new KeycloakInitOptionsInternal(initOptions) },
        { provide: KEYCLOAK_LOGIN_OPTIONS, useValue: loginOptions },
        { provide: KEYCLOAK_LOGOUT_OPTIONS, useValue: logoutOptions },
        { provide: KEYCLOAK_REGISTER_OPTIONS, useValue: registerOptions },
        { 
          provide: APP_INITIALIZER, 
          useFactory: (keycloak: KeycloakInternalService, options: KeycloakInitOptions) => () => keycloak.init(options), 
          multi: true, 
          deps: [ KeycloakInternalService, KEYCLOAK_INIT_OPTIONS ] 
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: KeycloakTokenInterceptor,
          multi: true
        },
        KeycloakInternalService,
        KeycloakService
      ]
    };
  }
}
