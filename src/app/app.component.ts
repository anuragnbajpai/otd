import { Component } from '@angular/core';
import { CoreService } from './core/service/core.service';
import { SessionService } from './core/state/session/session.service';
import { SwUpdate } from '@angular/service-worker';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OTD';
  constructor(private svcCore: CoreService, public stateSession: SessionService, 
              public updates: SwUpdate, private snackBar: MatSnackBar) {

    updates.available.subscribe(event => {
     // if (promptUser(event)) {
     let refSnackBar = this.snackBar.open('Update Available', 'Load', {
        duration: 10000,
      });
     refSnackBar.onAction().subscribe(() => {
        this.updates.activateUpdate().then(() => document.location.reload());
      });
     // }
    });

  }
}
