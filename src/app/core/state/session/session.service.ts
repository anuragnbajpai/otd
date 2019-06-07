import { SessionStore } from './Session.store';
import { Injectable } from '@angular/core';
import { SessionQuery } from './Session.query';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../../service/firestore.service';
import { findIndex } from 'rxjs/operators';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  device$ = this.query.select(e => e.device);
  page$ = this.query.select(e => e.page);
  country$ = this.query.select(e => e.country);
  countries = null;
  user$ = this.query.select(e => e.user);
  isLoggedin$ = this.query.select(e => e.user != null);
  searchKeyword$ = this.query.select(e => e.searchKeyword);
  constructor(private store: SessionStore, private svcFirestore: FirestoreService, private query: SessionQuery, private http: HttpClient) {

    this.http.get('http://www.geoplugin.net/json.gp').subscribe( (res: any) => {
      console.log('find location success');
      this.setCountry(res.geoplugin_countryCode.toLowerCase());
    });
    this.updateUser(JSON.parse(localStorage.getItem('user')));
    console.log(localStorage.getItem('user'));

    this.user$.subscribe(u => {
      localStorage.setItem('user', JSON.stringify(u) );
    });
  }

  UpdateDevice(device) {
    this.store.update(state => ({ ...state, device }));
  }

  updatePage(page) {
    this.store.update(state => ({ ...state, page }));
  }

  getDevice() {
    return this.query.getValue().device;
  }

  updateCountry(country){
    this.store.update(state => ({ ...state, country }));
  }
  setCountry(countryCode) {
    if (this.countries) {
      this.store.update(state => ({ ...state, country: this.countries.find(r => r.code === countryCode)[0] }));
    } else {
      this.svcFirestore.getCollection('countries').subscribe(c => {
        this.countries = c.map(d => d.payload.doc.data());
        this.store.update(state => ({ ...state, country: this.countries.find(r => r.code === countryCode) }));
      })
    }
  }
  getCountry(){
   return this.query.getValue().country;
  }
  getSearchKeyword(){
    return this.query.getValue().searchKeyword;
   }
   updateSearchKeyword(searchKeyword) {
    this.store.update(state => ({ ...state, searchKeyword }));
  }

  getPage(){
    return this.query.getValue().page;
   }
   getUser(){
    return this.query.getValue().user;
   }
   updateUser(user){
    this.store.update(state => ({ ...state, user }));
   }

   updateSaved(saved){
    this.store.update(state => ({ ...state, user : { ...state.user, saved}  }));
   }

   getSaved(){
    return this.query.getValue().user.saved;
   }

   isSaved(id){
    return this.query.getValue().user.saved.includes(id);
   }


}

