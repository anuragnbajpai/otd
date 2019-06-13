import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { User } from 'src/app/core/model/Session.model';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  sortBy = 'Date';
  user: User;
  constructor(public stateSession: SessionService, public stateSearch: SearchService, 
              private router: Router,private svcSnackbar: SnackbarService,
              private route: ActivatedRoute, private svcFirestore: FirestoreService
              ) { 
                this.user = this.stateSession.getUser();
    // if(this.stateSearch.selectedProduct.images == null
    //    || this.stateSearch.selectedProduct.images.length == 0){
    //   this.stateSearch.getImages();
    // }
  }

  ngOnInit() {
  }

  addReview(){
    this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'review' } });
  }

  liked(id){
    let index = this.stateSearch.selectedProduct.reviews[id].review.unliked.indexOf(this.user.id);
    if(index >= 0){
      this.stateSearch.selectedProduct.reviews[id].review.unliked.splice( index, 1);
    }
    this.stateSearch.selectedProduct.reviews[id].review.liked.push(this.user.id);
    this.svcFirestore.updateReviews('reviews', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.reviews);
  }
  unliked(id){
    let index = this.stateSearch.selectedProduct.reviews[id].review.liked.indexOf(this.user.id);
    if(index >= 0){
      this.stateSearch.selectedProduct.reviews[id].review.liked.splice( index , 1);
    }
    this.stateSearch.selectedProduct.reviews[id].review.unliked.push(this.user.id);
    this.svcFirestore.updateReviews('reviews', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.reviews);
  }

}
