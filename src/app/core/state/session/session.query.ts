import { Query } from '@datorama/akita';
import { SessionStore } from './Session.store';
import { SessionState } from '../../model/Session.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {
  constructor(protected store: SessionStore) {
    super(store);
  }
}

