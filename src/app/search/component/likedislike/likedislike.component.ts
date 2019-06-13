import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { SessionService } from 'src/app/core/state/session/session.service';
import { User } from 'src/app/core/model/Session.model';

@Component({
  selector: 'app-likedislike',
  templateUrl: './likedislike.component.html',
  styleUrls: ['./likedislike.component.css']
})
export class LikedislikeComponent implements OnInit {
  user: User;
  _id: number;
  @Input() set id(id: number) {
    this._id = id;
  }
  _vtype: string;
  @Input() set vtype(vtype: string) {
    this._vtype = vtype;
  }
  constructor(private svcFirestore: FirestoreService, 
              private stateSearch: SearchService, private stateSession: SessionService) { }

  ngOnInit() {
    this.user = this.stateSession.getUser();
  }

  liked(){
    this.stateSearch.selectedProduct.deals[this._id].review.liked.push(this.user.id);
    this.svcFirestore.updateDeals('deals', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.deals);
  }
  unliked(){

  }

}
