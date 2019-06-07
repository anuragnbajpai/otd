import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { MatTabChangeEvent } from '@angular/material';
import { SessionService } from 'src/app/core/state/session/session.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/service/firestore.service';
declare let navigator: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  isSelected = false;
  constructor(private route: ActivatedRoute, public stateSearch: SearchService, 
              public stateSession: SessionService, private svcFirestore: FirestoreService) {

  }

  ngOnInit() {

  }

  onSequenceChangeEvent(event: MatTabChangeEvent) {
    console.log(event.tab.textLabel);
    this.stateSearch.updateTab(event.tab.textLabel);
  }

  save(){
    let user =  JSON.parse( JSON.stringify(this.stateSession.getUser()));
    user.saved.push(this.stateSearch.selectedProduct.id);
    this.stateSession.updateUser(user);
    this.stateSearch.selectedProduct.isSelected = true;
    this.stateSearch.updateSavedStatusInSearchResult();
    this.svcFirestore.updateItem('users', user);
  }
  unsave() {
    let user =  JSON.parse( JSON.stringify(this.stateSession.getUser()));
    user.saved.splice( user.saved.indexOf(this.stateSearch.selectedProduct.id), 1);
    this.stateSession.updateUser(user);
    this.stateSearch.selectedProduct.isSelected = false;
    this.stateSearch.updateSavedStatusInSearchResult();
    this.svcFirestore.updateItem('users', user);
  }
  shared(){
    if(navigator.share) {
      navigator.share({
        title: this.stateSearch.selectedProduct.title,
        text: this.stateSearch.selectedProduct.description,
        url: environment.siteUrl + this.route.url
      })
      .then(() => console.log('Share complete'))
      .error((error) => console.error('Could not share at this time', error))
      }
    }
  
}
