import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clicked = false;
  constructor(
    private svcLogin: LoginService
    ) { }

  ngOnInit() {
  }

  tryFacebookLogin(){
    this.clicked = true;
    this.svcLogin.doFacebookLogin()
    .then(res => {      
      console.log(res);
      this.svcLogin.login(res);
      this.clicked = false;
    }, error =>{
      this.clicked = false;
    });
  }

  tryTwitterLogin(){
    this.clicked = true;
    this.svcLogin.doTwitterLogin()
    .then(res => { 
      this.svcLogin.login(res);
      this.clicked = false;
    }, error =>{
      this.clicked = false;
    });
  }

  tryGoogleLogin(){
    this.clicked = true;
    this.svcLogin.doGoogleLogin()
    .then(res => {
      this.svcLogin.login(res);
      this.clicked = false;
    }, error =>{
      this.clicked = false;
    });
  }

}
