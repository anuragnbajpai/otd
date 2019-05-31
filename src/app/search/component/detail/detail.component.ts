import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public stateSearch: SearchService) { }

  ngOnInit() {
  }

}
