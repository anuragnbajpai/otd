import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(public stateSearch: SearchService) { }

  ngOnInit() {
  }

}
