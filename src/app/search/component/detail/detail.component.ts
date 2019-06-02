import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public stateSearch: SearchService) { }

  ngOnInit() {
  }
  
  onSequenceChangeEvent(event: MatTabChangeEvent) {
    console.log(event.tab.textLabel);
    this.stateSearch.updateTab(event.tab.textLabel);
  }
}
