import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../service/firestore.service';
import { SearchService } from 'src/app/search/state/search.service';
import { SessionService } from '../../state/session/session.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-adddeal',
  templateUrl: './adddeal.component.html',
  styleUrls: ['./adddeal.component.css']
})
export class AdddealComponent {
  dealFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private svcFirestore: FirestoreService, 
              private stateSearch: SearchService, private stateSession: SessionService,
              public dialog: MatDialog) {
    let user = this.stateSession.getUser();
    this.dealFormGroup = this.formBuilder.group({
      'link': ['', [Validators.required]],
      'price': [null, [Validators.required]],
      'store': ['',[Validators.required]],
      'dateTime': [{seconds: (Date.now()/1000)} ],
      'userId': [user.id],
      'userName': [user.name],
      'userPicture': [user.picture]
    });
   }

  submitForm() {
    console.log('form submitted');
    this.stateSearch.selectedProduct.deals.unshift(this.dealFormGroup.value);
    this.dialog.closeAll();
    this.svcFirestore.updateDeals('deals', this.stateSearch.selectedProduct.id, this.stateSearch.selectedProduct.deals);
  }

}
