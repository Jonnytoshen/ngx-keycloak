import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KeycloakModule } from 'ngx-keycloak';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakModule.forRoot({
      url: 'http://localhost:8080',
      realm: 'my-realm',
      clientId: 'my-clientId',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
