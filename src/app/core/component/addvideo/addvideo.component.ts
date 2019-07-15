import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../service/firestore.service';
import { SearchService } from 'src/app/search/state/search.service';
import { SessionService } from '../../state/session/session.service';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css']
})
export class AddvideoComponent{

  videoFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private svcFirestore: FirestoreService, 
              private stateSearch: SearchService, private stateSession: SessionService,
              public dialog: MatDialog, private svcSnackbar: SnackbarService) {
    let user = this.stateSession.getUser();
    this.videoFormGroup = this.formBuilder.group({
      'link': ['', [Validators.required]],
      'dateTime': [{seconds: (Date.now()/1000)} ],
      'userId': [user.id],
      'userName': [user.name],
      'userPicture': [user.picture],
      'review': [{liked: [], unliked: []}]
    });
   }

  submitForm() {
    this.dialog.closeAll();
    this.svcSnackbar.ActionConfirmation('Video Uploaded Successfully', () => {
    console.log('form submitted');
    if(!this.stateSearch.selectedProduct.videos){
      this.stateSearch.selectedProduct.videos = [];
    }
    this.stateSearch.selectedProduct.videos.unshift(this.videoFormGroup.value);
    this.svcFirestore.updateVideos('videos', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.videos);

  });

  }
 
  goToImage(i){
    
  }
}
