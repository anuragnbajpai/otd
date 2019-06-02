import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  sortBy = 'price';
  constructor(public stateSearch: SearchService) {
  }

  ngOnInit() {
  }

  sort(sortBy){
    this.sortBy = sortBy;
   // this.stateSearch.selectedProduct.deals = this.stateSearch.selectedProduct.deals.sort((a: any, b: any) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
  }

}
