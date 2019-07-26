import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(public stateSearch: SearchService, public stateSession: SessionService) { }

  ngOnInit() {
  }
  tabSelect(i){
    this.stateSearch.tabIndex = i;
  }
}
