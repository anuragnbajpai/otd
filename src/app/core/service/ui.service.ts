import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/state/session/session.service';
import { LoginComponent } from '../page/login/login.component';
import { AddimageComponent } from 'src/app/core/component/addimage/addimage.component';
import { AdddealComponent } from 'src/app/core/component/adddeal/adddeal.component';
import { AddreviewComponent } from 'src/app/core/component/addreview/addreview.component';
import { AddfilterComponent } from 'src/app/core/component/addfilter/addfilter.component';
import { AddreportComponent } from '../component/addreport/addreport.component';
import { AddproductComponent } from '../component/addproduct/addproduct.component';

@Injectable({ providedIn: 'root' })
export class UiService {
  isOpen = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private stateSession: SessionService) {
  }


  openDialog(component): void {
    let dialogComponent: any;
    if (component !== 'filter') {

      if (this.checkLogin()) {
        switch (component) {
          case 'report':
            dialogComponent = AddreportComponent;
            break;
          case 'image':
            dialogComponent = AddimageComponent;
            break;
          case 'deal':
            dialogComponent = AdddealComponent;
            break;
          case 'review':
            dialogComponent = AddreviewComponent;
            break;
          case 'product':
            dialogComponent = AddproductComponent;
            break;
        }

      } else {

        dialogComponent = LoginComponent;
        if (!this.isOpen) {
          sessionStorage.setItem('component', component);
          sessionStorage.setItem('redirectTo', decodeURIComponent(this.router.url.split('?')[0]));
          console.log(sessionStorage.getItem('redirectTo'));
          this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])], { relativeTo: this.route, queryParams: { add: 'login' } });
        } else {
          return;
        }
      }

    } else {
      dialogComponent = AddfilterComponent;
    }
    this.isOpen = true;
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '400px',
      maxHeight: '600px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([decodeURIComponent(this.router.url.split('?')[0])]);
      sessionStorage.removeItem('redirectTo');
      sessionStorage.removeItem('component');
      this.isOpen = false;
    });


  }

  closeDialog() {
    this.dialog.closeAll();
  }

  checkLogin() {
    if (this.stateSession.getUser()) // user is logged in
    {
      return true;
    } else {
      return false;
    }
  }
}
