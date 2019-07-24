import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { User } from 'src/app/core/model/Session.model';
import { SessionService } from 'src/app/core/state/session/session.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  sortBy = 'Date';
  user: User;
  constructor(public stateSession: SessionService,public stateSearch: SearchService,
              private router: Router,  private route: ActivatedRoute,
              private svcFirestore: FirestoreService,  private svcSnackbar: SnackbarService) {
                this.stateSession.user$.subscribe(u => {
                  this.user = u;
                });
    // if(this.stateSearch.selectedProduct.images == null
    //    || this.stateSearch.selectedProduct.images.length == 0){
    //   this.stateSearch.getImages();
    // }
  }

  ngOnInit() {
  }

  addVideo(){
    this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'video' } });
  }

  report(e){
    this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'report' } });
  }

  // liked(id){
  //   let index = this.stateSearch.selectedProduct.videos[id].review.unliked.indexOf(this.user.id);
  //   if(index >= 0){
  //     this.stateSearch.selectedProduct.videos[id].review.unliked.splice( index, 1);
  //   }
  //   this.stateSearch.selectedProduct.videos[id].review.liked.push(this.user.id);
  //   this.svcFirestore.updateVideos('videos', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.videos);
  // }
  // unliked(id){
  //   let index = this.stateSearch.selectedProduct.images[id].review.liked.indexOf(this.user.id);
  //   if(index >= 0){
  //     this.stateSearch.selectedProduct.images[id].review.liked.splice( index , 1);
  //   }
  //   this.stateSearch.selectedProduct.images[id].review.unliked.push(this.user.id);
  //   this.svcFirestore.updateImages('images', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.images);
  // }

  delete(e){
    console.log(e);
    this.stateSearch.selectedProduct.videos.splice(this.stateSearch.selectedProduct.videos.indexOf(e), 1);
    this.stateSearch.updateSearchResultItem(this.stateSearch.selectedProduct);
    this.svcFirestore.updateVideos('videos', 
    this.stateSearch.selectedProduct.id , this.stateSearch.selectedProduct.videos);
  }
 
  
}
