import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../service/firestore.service';
import { SearchService } from 'src/app/search/state/search.service';
import { SessionService } from '../../state/session/session.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent {

  reviewFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private svcFirestore: FirestoreService, 
              private stateSearch: SearchService, private stateSession: SessionService,
              public dialog: MatDialog) {
    let user = this.stateSession.getUser();
    this.reviewFormGroup = this.formBuilder.group({
      'comments': ['', [Validators.required]],
      'rating': [0, [Validators.required]],
      'dateTime': [{seconds: (Date.now()/1000)} ],
      'userId': [user.id],
      'userName': [user.name],
      'userPicture': [user.picture]
    });
   }

  submitForm() {
    console.log('form submitted');
    this.stateSearch.selectedProduct.reviews = this.stateSearch.selectedProduct.reviews? this.stateSearch.selectedProduct.reviews: [];
    this.stateSearch.selectedProduct.reviews.unshift(this.reviewFormGroup.value);
    this.dialog.closeAll();
    let total = 0;
    this.stateSearch.selectedProduct.reviews.forEach(r => {
      total += r.rating;
    });
    this.stateSearch.selectedProduct.avgRating = (total / this.stateSearch.selectedProduct.reviews.length);
    this.svcFirestore.updateReviews('reviews', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.reviews);
    this.svcFirestore.updateAvgRating(this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.avgRating );
  }

  onRatingChange(e){
    console.log(e);
    this.reviewFormGroup.get('rating').setValue(e.rating);
  }

}
