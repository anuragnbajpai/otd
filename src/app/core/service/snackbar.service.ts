import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable({
    providedIn: 'root'
  })
export class SnackbarService {
    undo = false;
    constructor(private snackBar: MatSnackBar) {
    }

    Confirmation(msg){
      this.snackBar.open(msg, 'Ok', {
        duration: 2000
      });
    }
  
    ActionConfirmation(msg, func, data) {
      this.undo = false;
      const snackBarRef = this.snackBar.open(msg, 'Undo', {
        duration: 2000
      });

      setTimeout( () => {
        if(!this.undo){
          func(data);
        }
      }, 3000);
  
      snackBarRef.onAction().subscribe(() => {
        console.log('undo');
        this.undo = true;
      });
    }
}
