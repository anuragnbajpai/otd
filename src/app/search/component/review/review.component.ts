import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  sortBy = 'Date';
  constructor(public stateSearch: SearchService, private router: Router,
              private route: ActivatedRoute) { 
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

}
