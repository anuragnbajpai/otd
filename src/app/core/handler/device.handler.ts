import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { SessionService } from '../state/session/session.service';

@Injectable({
    providedIn: 'root'
  })
export class DeviceHandler {
    constructor(private mediaObserver: MediaObserver, private stateSession: SessionService) {
        mediaObserver.media$.subscribe(m => {
            this.stateSession.UpdateDevice(m.mqAlias);
        });
    }

}