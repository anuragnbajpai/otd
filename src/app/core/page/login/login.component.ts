import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CoreService } from '../../service/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
   // private svcCore: CoreService
    ) { }

  ngOnInit() {
  }

  // tryFacebookLogin(){
  //   this.svcCore.login.doFacebookLogin()
  //   .then(res => {
  //     console.log(res);
  //     this.svcCore.login.login(res);
  //   }, error =>{
  //   });
  // }

  // tryTwitterLogin(){
  //   this.svcCore.login.doTwitterLogin()
  //   .then(res => {
  //     this.svcCore.login.login(res);
  //   }, error =>{
  //   });
  // }

  // tryGoogleLogin(){
  //   this.svcCore.login.doGoogleLogin()
  //   .then(res => {
  //     this.svcCore.login.login(res);
  //   }, error =>{
  //   });
  // }

}
