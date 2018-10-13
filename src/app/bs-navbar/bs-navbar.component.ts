import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser:{};
  constructor(private auth:AuthService) {
     
auth.AppUser$.subscribe(appUser=> this.appUser = appUser);
console.log(this.appUser);
   }

  
  logout(){
    //console.log(this.auth.user$);
    this.auth.logout();
  }

}
