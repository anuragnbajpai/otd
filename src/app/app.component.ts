import { Component } from '@angular/core';
import { CoreService } from './core/service/core.service';
import { SessionService } from './core/state/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OTD';
  constructor(private svcCore: CoreService, private stateSession: SessionService) {

  }
}
