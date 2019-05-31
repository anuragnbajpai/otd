import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
  })
export class WindowHandler {
    constructor(private snackBar: MatSnackBar) {
        this.initOfflineNotification();
    }

    private initOfflineNotification(){
        // now we listen for network status changes
        window.addEventListener('online', () => {
          this.showStatus(true);
        });

        window.addEventListener('offline', () => {
          this.showStatus(false);
        });
      }
      private showStatus(s){
        // alert(s?'online':'offline');
        console.log(s)
        if(!s){
          this.snackBar.open('You are Offline');
        } else {
          this.snackBar.open('You are back Online', 'Ok', {
                duration: 2000,
          });
        }
      }
}