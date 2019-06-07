import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { MatTabChangeEvent } from '@angular/material';
import { SessionService } from 'src/app/core/state/session/session.service';
import { getDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  isSelected = false;
  constructor(public stateSearch: SearchService, public stateSession: SessionService) {

  }

  ngOnInit() {

  }

  onSequenceChangeEvent(event: MatTabChangeEvent) {
    console.log(event.tab.textLabel);
    this.stateSearch.updateTab(event.tab.textLabel);
  }

  save(){
  let saved =  Object.assign([], this.stateSession.getSaved());
  saved.push(this.stateSearch.selectedProduct.id);
  this.stateSession.updateSaved(saved);
  this.stateSearch.selectedProduct.isSelected = true;
  this.stateSearch.updateSavedStatusInSearchResult();
  }
  unsave(){
    let saved =  Object.assign([], this.stateSession.getSaved());
    saved.splice( saved.indexOf(this.stateSearch.selectedProduct.id), 1);
    this.stateSession.updateSaved(saved);
    this.stateSearch.selectedProduct.isSelected = false;
    this.stateSearch.updateSavedStatusInSearchResult();
  }
}
