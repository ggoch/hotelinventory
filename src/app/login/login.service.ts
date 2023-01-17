import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn:boolean = false;
  isAdminIn:boolean = false;

  constructor() { }

  login(email:string,password:string){
    if(email === "Admin@gmail.com" && password === "Admin"){
       this.isLoggedIn = true;
       this.isAdminIn = true;
    }

    if(email === "user@gmail.com" && password === "user"){
      this.isLoggedIn = true
    }

    return this.isLoggedIn;
  }
}
