import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../service/firestore.service';
import { SearchService } from 'src/app/search/state/search.service';
import { SessionService } from '../../state/session/session.service';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../service/snackbar.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-addreport',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.css']
})
export class AddreportComponent {
  reportFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private svcFirestore: FirestoreService, 
              private stateSearch: SearchService, private stateSession: SessionService,
              public dialog: MatDialog, private svcSnackbar: SnackbarService) {
    let user = this.stateSession.getUser();
    this.reportFormGroup = this.formBuilder.group({
      'reason': ['', [Validators.required]],
      'comment': ['',[Validators.required]],
      'type': [this.stateSearch.getTabValue(), [Validators.required]],
      'dateTime': [{seconds: (Date.now()/1000)} ],
      'userId': [user.id],
      'userName': [user.name],
      'userPicture': [user.picture],
    });
   }

  submitForm() {
    this.dialog.closeAll();
    this.svcSnackbar.ActionConfirmation('report Saved Successfully', ()=>{
      console.log('form submitted');
      this.svcFirestore.getDocument('reports', this.stateSearch.selectedProduct.id).pipe(take(1)).subscribe(d => {
        let data = d.payload.data() as any;
        if(data && data.reports){
          data.reports.push(this.reportFormGroup.value);
        } else {
          data = [this.reportFormGroup.value];
        }
        this.svcFirestore.updateReports('reports', this.stateSearch.selectedProduct.id, data );
      });
      
    });
  }

}

