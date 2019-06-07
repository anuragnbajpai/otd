import { SessionStore } from './Session.store';
import { Injectable } from '@angular/core';
import { SessionQuery } from './Session.query';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../../service/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  device$ = this.query.select(e => e.device);
  page$ = this.query.select(e => e.page);
  country$ = this.query.select(e => e.country);
  countries = null;

  constructor(private store: SessionStore, private svcFirestore: FirestoreService, private query: SessionQuery, private http: HttpClient) {

    this.http.get('http://www.geoplugin.net/json.gp').subscribe( (res: any) => {
      console.log('find location success');
      this.setCountry(res.geoplugin_countryCode.toLowerCase());
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
  getItem(){
    return this.query.getValue().item;
   }
   updateItem(item) {
    this.store.update(state => ({ ...state, item }));
  }

  getPage(){
    return this.query.getValue().page;
   }
   getUser(){
    return this.query.getValue().user;
   }

}

