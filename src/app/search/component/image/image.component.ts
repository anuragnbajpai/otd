import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { User } from 'src/app/core/model/Session.model';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  sortBy = 'Date';
  user: User;
  constructor(public stateSession: SessionService,public stateSearch: SearchService,
              private router: Router,  private route: ActivatedRoute, 
              private svcFirestore: FirestoreService,  private svcSnackbar: SnackbarService) {
                this.user = this.stateSession.getUser();
    // if(this.stateSearch.selectedProduct.images == null
    //    || this.stateSearch.selectedProduct.images.length == 0){
    //   this.stateSearch.getImages();
    // }
  }

  ngOnInit() {
  }

  addImage(){
    this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'image' } });
  }

  liked(id){
    let index = this.stateSearch.selectedProduct.images[id].review.unliked.indexOf(this.user.id);
    if(index >= 0){
      this.stateSearch.selectedProduct.images[id].review.unliked.splice( index, 1);
    }
    this.stateSearch.selectedProduct.images[id].review.liked.push(this.user.id);
    this.svcFirestore.updateImages('images', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.images);
  }
  unliked(id){
    let index = this.stateSearch.selectedProduct.images[id].review.liked.indexOf(this.user.id);
    if(index >= 0){
      this.stateSearch.selectedProduct.images[id].review.liked.splice( index , 1);
    }
    this.stateSearch.selectedProduct.images[id].review.unliked.push(this.user.id);
    this.svcFirestore.updateImages('images', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.images);
  }

}
