import { HttpRequest } from "@angular/common/http";
import {
  InjectionToken
} from "@angular/core";
import {
  KeycloakAdapter,
  KeycloakConfig, 
  KeycloakFlow, 
  KeycloakInitOptions, 
  KeycloakLoginOptions, 
  KeycloakLogoutOptions,
  KeycloakOnLoad,
  KeycloakPkceMethod,
  KeycloakResponseMode
} from 'keycloak-js';

export class KeycloakInitOptionsInternal implements KeycloakInitOptions  {
/**
	 * Adds a [cryptographic nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)
	 * to verify that the authentication response matches the request.
	 * @default true
	 */
 useNonce?: boolean = true;

 /**
  * 
  * Allow usage of different types of adapters or a custom adapter to make Keycloak work in different environments.
  *
  * The following options are supported:
  * - `default` - Use default APIs that are available in browsers.
  * - `cordova` - Use a WebView in Cordova.
  * - `cordova-native` - Use Cordova native APIs, this is recommended over `cordova`.
  *
  * It's also possible to pass in a custom adapter for the environment you are running Keycloak in. In order to do so extend the `KeycloakAdapter` interface and implement the methods that are defined there.
  *
  * For example:
  *
  * ```ts
  * import Keycloak, { KeycloakAdapter } from 'keycloak-js';
  *
  * // Implement the 'KeycloakAdapter' interface so that all required methods are guaranteed to be present.
  * const MyCustomAdapter: KeycloakAdapter = {
  * 	login(options) {
  * 		// Write your own implementation here.
  * 	}
  *
  * 	// The other methods go here...
  * };
  *
  * const keycloak = new Keycloak();
  *
  * keycloak.init({
  * 	adapter: MyCustomAdapter,
  * });
  * ```
  */
 adapter?: 'default' | 'cordova' | 'cordova-native' | KeycloakAdapter = 'default';
 
 /**
  * Specifies an action to do on load.
  */
 onLoad?: KeycloakOnLoad;

 /**
  * Set an initial value for the token.
  */
 token?: string;

 /**
  * Set an initial value for the refresh token.
  */
 refreshToken?: string;

 /**
  * Set an initial value for the id token (only together with `token` or
  * `refreshToken`).
  */
 idToken?: string;

 /**
  * Set an initial value for skew between local time and Keycloak server in
  * seconds (only together with `token` or `refreshToken`).
  */
 timeSkew?: number;

 /**
  * Set to enable/disable monitoring login state.
  * @default true
  */
 checkLoginIframe?: boolean = true;

 /**
  * Set the interval to check login state (in seconds).
  * @default 5
  */
 checkLoginIframeInterval?: number = 5;

 /**
  * Set the OpenID Connect response mode to send to Keycloak upon login.
  * @default fragment After successful authentication Keycloak will redirect
  *                   to JavaScript application with OpenID Connect parameters
  *                   added in URL fragment. This is generally safer and
  *                   recommended over query.
  */
 responseMode?: KeycloakResponseMode = 'fragment';

 /**
  * Specifies a default uri to redirect to after login or logout.
  * This is currently supported for adapter 'cordova-native' and 'default'
  */
 redirectUri?: string;

 /**
  * Specifies an uri to redirect to after silent check-sso.
  * Silent check-sso will only happen, when this redirect uri is given and
  * the specified uri is available whithin the application.
  */
 silentCheckSsoRedirectUri?: string;

 /**
  * Specifies whether the silent check-sso should fallback to "non-silent"
  * check-sso when 3rd party cookies are blocked by the browser. Defaults
  * to true.
  */
 silentCheckSsoFallback?: boolean = true;

 /**
  * Set the OpenID Connect flow.
  * @default standard
  */
 flow?: KeycloakFlow = 'standard';

 /**
  * Configures the Proof Key for Code Exchange (PKCE) method to use.
  * The currently allowed method is 'S256'.
  * If not configured, PKCE will not be used.
  */
 pkceMethod?: KeycloakPkceMethod;

 /**
  * Enables logging messages from Keycloak to the console.
  * @default false
  */
 enableLogging?: boolean = false;

 /**
  * Configures how long will Keycloak adapter wait for receiving messages from server in ms. This is used,
  * for example, when waiting for response of 3rd party cookies check.
  *
  * @default 10000
  */
 messageReceiveTimeout?: number = 10000;

 constructor(options?: KeycloakInitOptions) {
  Object.assign(this, options);
 }
}

export class KeycloakCustomOptions {
  loadUserProfileAtInit: boolean = true;
  enableTokenInterceptor: boolean = true;
  authorizationHeaderName: string = 'Authorization';
  tokenInterceptorFilter: (req: HttpRequest<any>) => boolean = () => false;
  tokenInterceptorUrls: string[] = [];

  constructor(options?: Partial<KeycloakCustomOptions>) {
    Object.assign(this, options);
  }
}


export type KeycloakOptions = KeycloakConfig & Partial<KeycloakCustomOptions> & {
  initOptions?: KeycloakInitOptions,
  loginOptions?: KeycloakLoginOptions,
  logoutOptions?: KeycloakLogoutOptions,
  registerOptions?: Omit<KeycloakLoginOptions, 'action'>,
};

export const KEYCLOAK_ANGULAR_LIBRARY_OPTIONS = new InjectionToken<KeycloakOptions>('Keycloak Angular library Options');
export const KEYCLOAK_ANGULAR_LIBRARY_CUSTOM_OPTIONS = new InjectionToken<KeycloakCustomOptions>('Keycloak Angular library Custom Options');
export const KEYCLOAK_CONFIG = new InjectionToken<KeycloakConfig>('Keycloak Config');
export const KEYCLOAK_INIT_OPTIONS = new InjectionToken<KeycloakInitOptions>('Keycloak Init Options');
export const KEYCLOAK_LOGIN_OPTIONS = new InjectionToken<KeycloakLoginOptions>('Keycloak Login Options');
export const KEYCLOAK_LOGOUT_OPTIONS = new InjectionToken<KeycloakLogoutOptions>('Keycloak Logout Options');
export const KEYCLOAK_REGISTER_OPTIONS = new InjectionToken<Omit<KeycloakLoginOptions, 'action'>>('Keycloak Register Options');

