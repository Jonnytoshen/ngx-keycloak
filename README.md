# ngx-keycloak

Keycloak for [`Angular`](https://angular.io/) applications based on [`keycloak-js`](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter).


## Installation
```
npm install ngx-keycloak keycloak-js
```

## Usage
### Setup 
Import the ```KeycloakModule``` module to ```AppModule``` and simply configure it
``` 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakModule } from 'ngx-keycloak';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakModule.forRoot({
      url: 'http://keycloak-server',
      realm: 'your-realm',
      clientId: 'your-client-id',
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### AuthGuard 
Use ```KeycloakAuthGuard``` guard to configure the ```canActivate``` property for routes that require authentication.
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAuthGuard } from 'ngx-keycloak';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    // user routes require authentication
    path: 'user',
    component: UserComponent,
    canActivate: [KeycloakAuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
### HttpClient Interceptor
There is also the possibility to add authorization header to requests. Simply configure the ```tokenInterceptorFilter``` or ```tokenInterceptorUrls``` option.
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakModule } from 'ngx-keycloak';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakModule.forRoot({
      url: 'http://keycloak-server',
      realm: 'your-realm',
      clientId: 'your-client-id',
      tokenInterceptorUrls: [
        '/api/xlsx/calc_v2',
        '/api/xlsx/download'
      ],
      // or
      tokenInterceptorFilter: req => {
        ...some logics
        return ture
      }
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```