import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private user:UserService) { }
  canActivate(){

            return this.auth.AppUser$
          .pipe(map((hh:AppUser)=> hh.isAdmin  ))
         
     }
    


  }



