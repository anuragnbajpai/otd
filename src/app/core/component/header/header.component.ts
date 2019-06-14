import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SessionService } from '../../state/session/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public leftNav = new EventEmitter();
  
  constructor( public stateSession: SessionService, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit() {
  }

  open(){
    this.leftNav.emit(true);
  }

  changeCountry(country){
    this.stateSession.updateCountry(country);
  }
  logout(){
    localStorage.removeItem('user');
    this.stateSession.updateUser(null);
  }
  login(){
    const url = this.router.url.split('?')[0];
    this.router.navigate([ decodeURIComponent(url) ], { queryParams: { add: 'login' } });
  }
}
