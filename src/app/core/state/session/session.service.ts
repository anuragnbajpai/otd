import { SessionStore } from './Session.store';
import { Injectable } from '@angular/core';
import { SessionQuery } from './Session.query';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  device$ = this.query.select(e => e.device);
  page$ = this.query.select(e => e.page);

  constructor(private store: SessionStore, private query: SessionQuery ) {
  }

  UpdateDevice(device){
    this.store.update(state => ({...state, device}));
  }

  updatePage(page){
    this.store.update(state => ({...state, page}));
  }

}

