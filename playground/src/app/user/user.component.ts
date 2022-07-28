import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'ngx-keycloak';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    protected keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    // this.keycloakService.getUserProfile().subscribe(data => {
    //   console.log(data);
    // });
  }

  refreshToken(): void {
    // this.keycloakService.refreshToken().subscribe();
  }

}
