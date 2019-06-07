import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { SessionService } from 'src/app/core/state/session/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  sortBy = 'price';
  constructor(public stateSearch: SearchService, public stateSession: SessionService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  sort(sortBy){
    this.sortBy = sortBy;
   // this.stateSearch.selectedProduct.deals = this.stateSearch.selectedProduct.deals.sort((a: any, b: any) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
  }
  addDeal(){
    this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'deal' } });
  }

}
