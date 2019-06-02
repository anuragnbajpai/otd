import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  sortBy = 'Price';
  constructor(public stateSearch: SearchService) {
  }

  ngOnInit() {
  }

}
