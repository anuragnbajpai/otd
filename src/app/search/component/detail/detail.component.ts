import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { MatTabChangeEvent } from '@angular/material';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public stateSearch: SearchService, public stateSession: SessionService) { }

  ngOnInit() {
  }
  
  onSequenceChangeEvent(event: MatTabChangeEvent) {
    console.log(event.tab.textLabel);
    this.stateSearch.updateTab(event.tab.textLabel);
  }
}
