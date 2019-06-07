import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private svcLogin: LoginService
    ) { }

  ngOnInit() {
  }

  tryFacebookLogin(){
    this.svcLogin.doFacebookLogin()
    .then(res => {
      console.log(res);
      this.svcLogin.login(res);
    }, error =>{
    });
  }

  tryTwitterLogin(){
    this.svcLogin.doTwitterLogin()
    .then(res => {
      this.svcLogin.login(res);
    }, error =>{
    });
  }

  tryGoogleLogin(){
    this.svcLogin.doGoogleLogin()
    .then(res => {
      this.svcLogin.login(res);
    }, error =>{
    });
  }

}
