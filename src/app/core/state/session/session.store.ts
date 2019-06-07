import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SessionState } from '../../model/Session.model';

export function createInitialState(): SessionState {
  return {
    device: 'xs',
    page: 'home',
    item: '',
    user: null,
    country: null
  } as SessionState;
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'Session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}


