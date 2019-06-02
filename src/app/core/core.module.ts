import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './module/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { AppErrorHandler } from './handler/error.handler';
import { FontawesomeModule } from './module/fontawesome.module';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SearchinputComponent } from './component/searchinput/searchinput.component';
import { LeftnavComponent } from './component/leftnav/leftnav.component';
import {  RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { ContactusComponent } from './page/contactus/contactus.component';
import { AboutusComponent } from './page/aboutus/aboutus.component';
import { SavedComponent } from './page/saved/saved.component';
import { SortPipe } from './pipe/sort.pipe';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, SearchinputComponent, 
    LeftnavComponent, ContactusComponent, AboutusComponent, SavedComponent, SortPipe],
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      tapToDismiss: true
    }),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    FontawesomeModule,
    RouterModule,
    StarRatingModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatCarouselModule,
    FontAwesomeModule,
    FontawesomeModule,
    RouterModule,
    LeftnavComponent,
    HeaderComponent,
    FooterComponent,
    SearchinputComponent,
    StarRatingModule,
    SortPipe
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ]
})
export class CoreModule { }
