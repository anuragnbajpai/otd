import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StarRatingModule } from 'angular-star-rating';
import { AddreviewComponent } from './core/component/addreview/addreview.component';
import { AdddealComponent } from './core/component/adddeal/adddeal.component';
import { AddimageComponent } from './core/component/addimage/addimage.component';
import { AddfilterComponent } from './core/component/addfilter/addfilter.component';

@NgModule({
  declarations: [
    AppComponent,
    AddimageComponent, AdddealComponent, AddreviewComponent, AddfilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 
    BrowserAnimationsModule,
    CoreModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StarRatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddimageComponent, AdddealComponent, AddreviewComponent, AddfilterComponent]
})
export class AppModule { }
