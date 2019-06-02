import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  constructor(public stateSearch: SearchService) { }

  ngOnInit() {
  }

}
