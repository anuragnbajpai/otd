import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SessionService } from '../../state/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public leftNav = new EventEmitter();
  
  constructor( public stateSession: SessionService) { }

  ngOnInit() {
  }

  open(){
    this.leftNav.emit(true);
  }

  changeCountry(country){
    this.stateSession.updateCountry(country);
  }
}
