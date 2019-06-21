import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { SessionService } from 'src/app/core/state/session/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/model/Session.model';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { SnackbarService } from 'src/app/core/service/snackbar.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  sortBy = 'price';
  user: User;
  constructor(public stateSearch: SearchService, public stateSession: SessionService,
              private router: Router, private route: ActivatedRoute,
              private svcFirestore: FirestoreService, private svcSnackbar: SnackbarService) {
                this.stateSession.user$.subscribe(u => {
                  this.user = u;
                });
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

  goToLink(url: string){
    window.open(url, '_blank');
}
report(e){
  this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'report' } });
}

liked(id){
  let index = this.stateSearch.selectedProduct.deals[id].review.unliked.indexOf(this.user.id);
  if(index >= 0){
    this.stateSearch.selectedProduct.deals[id].review.unliked.splice( index, 1);
  }
  this.stateSearch.selectedProduct.deals[id].review.liked.push(this.user.id);
  this.svcFirestore.updateDeals('deals',
  this.stateSearch.selectedProduct.id + '-' + this.stateSession.getCountry().code, this.stateSearch.selectedProduct.deals);
}
unliked(id){
  let index = this.stateSearch.selectedProduct.deals[id].review.liked.indexOf(this.user.id);
  if(index >= 0){
    this.stateSearch.selectedProduct.deals[id].review.liked.splice( index , 1);
  }
  this.stateSearch.selectedProduct.deals[id].review.unliked.push(this.user.id);
  this.svcFirestore.updateDeals('deals',
  this.stateSearch.selectedProduct.id + '-' + this.stateSession.getCountry().code, this.stateSearch.selectedProduct.deals);
}

delete(e){
  console.log(e);
  this.stateSearch.selectedProduct.deals.splice(this.stateSearch.selectedProduct.deals.indexOf(e), 1);
  this.stateSearch.updateSearchResultItem(this.stateSearch.selectedProduct);
  this.svcFirestore.updateDeals('deals', 
  this.stateSearch.selectedProduct.id + '-' + this.stateSession.getCountry().code, this.stateSearch.selectedProduct.deals);
}

}
