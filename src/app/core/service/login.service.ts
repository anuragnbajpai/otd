import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { tap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../page/login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { User } from '../model/Session.model';
import { SessionService } from '../state/session/session.service';
import { UiService } from './ui.service';
import { SnackbarService } from './snackbar.service';
import * as firebase from 'firebase/app';
@Injectable({ providedIn: 'root' })
export class LoginService {


  constructor(
    
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public svcFirestore: FirestoreService,
    private stateSession: SessionService,
    public dialog: MatDialog,
    private svcSnackbar: SnackbarService
  ) {
    this.afAuth.auth.getRedirectResult().then((result) => {

      if (result.user != null) {
       this.login(result);
      } else {
        console.log('page redirected no credential');
      }
    }).catch((error) => {
      console.log(error);
      alert(error.email + ' ' + error.message);
    });

   }

 login(result){
  let accountInfo = new User();
  accountInfo.name = result.user.displayName;
  accountInfo.email = result.user.email;
  accountInfo.picture = result.user.photoURL;
  accountInfo.role = 'read';
  accountInfo.saved = [];

  this.svcFirestore.getCollectionCondition('users', ref => ref.where('email', '==', accountInfo.email) )
  .pipe(take(1)).subscribe((res: any) =>
  {
    if(res.length > 0){
      let user = res.map(r => r.payload.doc.data());
      accountInfo = user[0];
    } else {
      accountInfo.id = this.svcFirestore.createItem('users', accountInfo);
    }
   // this.gApi.AccountInfo = accountInfo;
    this.stateSession.updateUser(accountInfo);
    localStorage.setItem('user', JSON.stringify(accountInfo));
    let url = decodeURIComponent(sessionStorage.getItem('redirectTo').toString());
    this.dialog.closeAll();
    this.svcSnackbar.Confirmation('Successfully logged in');
    //localStorage.removeItem('redirectTo');
    this.router.navigate([url], { relativeTo: this.route, queryParams: { add: sessionStorage.getItem('component') } });    
  });
}

 isRunningStandalone() {
  return (window.matchMedia('(display-mode: standalone)').matches);
}

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {

      const provider = new firebase.auth.FacebookAuthProvider();

      if(this.isRunningStandalone())
      {
        this.afAuth.auth.signInWithRedirect(provider)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
      } else {

          this.afAuth.auth.signInWithPopup(provider)
          .then(res => {
            console.log('facebook success');
            console.log(res);
            resolve(res);
          }, err => {
            console.log('facebook error');
            console.log(err);
            alert(err.email + ' ' + err.message);
            reject(err);
          });

      }
    });
  }

  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      if(this.isRunningStandalone())
      {
        this.afAuth.auth
        .signInWithRedirect(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
      }
      else{
        {
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            resolve(res);
          }, err => {
            console.log(err);
            alert(err.email + ' ' + err.message);
            reject(err);
          })
        }
      }

    });
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      if(this.isRunningStandalone())
      {
        this.afAuth.auth
        .signInWithRedirect(provider)
        .then(res => {
          console.log('google success');
          resolve(res);
        }, err => {
          console.log('google error');
          console.log(err);
          reject(err);
        });
      }  else{
        {
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            resolve(res);
          }, err => {
            console.log(err);
            alert(err.email + ' ' + err.message);
            reject(err);
          })
        }
      }
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged((user) =>{
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value): {}{
    return new Promise((resolve, reject) => {
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then((res:any) => {
         resolve(res)
      }, err => reject(err))
    })
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '250px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.router.navigate([decodeURIComponent(this.router.url.split('?')[0]) ]);
  //   });
  // }

  // get() {
  //   return this.http.get('https://api.com').pipe(tap(entities => {
  //     this.loginStore.set(entities)
  //   }));
  // }

  // add(login: Login) {
  //   this.loginStore.add(login);
  // }

  // update(id, login: Partial<Login>) {
  //   this.loginStore.update(id, login);
  // }

  // remove(id: ID) {
  //   this.loginStore.remove(id);
  // }
}
