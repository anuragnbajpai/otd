import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/state/session/session.service';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( public stateSession: SessionService, public stateSearch: SearchService) { }

  ngOnInit() {
  }

}
