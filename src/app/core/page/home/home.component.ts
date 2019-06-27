import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../state/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public stateSession: SessionService) { }

  ngOnInit() {
  }

}
