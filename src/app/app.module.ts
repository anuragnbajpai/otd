import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './routing.module';
import { StarRatingModule } from 'angular-star-rating';
import { AddreviewComponent } from './core/component/addreview/addreview.component';
import { AdddealComponent } from './core/component/adddeal/adddeal.component';
import { AddimageComponent } from './core/component/addimage/addimage.component';
import { AddfilterComponent } from './core/component/addfilter/addfilter.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AddimageComponent, AdddealComponent, AddreviewComponent, AddfilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    StarRatingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddimageComponent, AdddealComponent, AddreviewComponent, AddfilterComponent]
})
export class AppModule { }
