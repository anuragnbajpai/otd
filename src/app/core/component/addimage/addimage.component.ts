import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../service/firestore.service';
import { SearchService } from 'src/app/search/state/search.service';
import { SessionService } from '../../state/session/session.service';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent{

  imageFormGroup: FormGroup;
  file: any;
  image: any;
  constructor(private formBuilder: FormBuilder, private svcFirestore: FirestoreService, 
              private stateSearch: SearchService, private stateSession: SessionService,
              public dialog: MatDialog, private svcSnackbar: SnackbarService) {
    let user = this.stateSession.getUser();
    this.imageFormGroup = this.formBuilder.group({
      'link': ['', [Validators.required]],
      'description': ['',[Validators.required]],
      'dateTime': [{seconds: (Date.now()/1000)} ],
      'userId': [user.id],
      'userName': [user.name],
      'userPicture': [user.picture],
      'review': [{liked: [], unliked: []}]
    });
   }

  submitForm() {
    this.dialog.closeAll();
    this.svcSnackbar.ActionConfirmation('Image Uploaded Successfully', () => {
    console.log('form submitted');
    
    
    this.svcFirestore.uploadImage( '/' + this.stateSearch.selectedProduct.id + '/' , this.file ).subscribe(t => {
      t.subscribe(url => {
        console.log(url);
        this.imageFormGroup.get('link').setValue(url);
        this.stateSearch.selectedProduct.images.unshift(this.imageFormGroup.value);
        this.svcFirestore.updateImages('images', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.images);
      });
      console.log(t);
    });
  });

  }
  uploadImage(e){
    this.imageFormGroup.get('link').setValue('link');
    this.file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
         this.image = reader.result;
    }
    reader.readAsDataURL(this.file);
  }
  goToImage(i){
    
  }
}
