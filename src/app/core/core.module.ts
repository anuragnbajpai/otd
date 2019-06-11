import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './page/login/login.component';
import { AddfilterComponent } from './component/addfilter/addfilter.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, SearchinputComponent, 
    LeftnavComponent, ContactusComponent, AboutusComponent, SavedComponent, SortPipe, LoginComponent
 ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    FlexLayoutModule,
    FontAwesomeModule,
    FontawesomeModule,
    RouterModule,
    HttpClientModule
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
    SortPipe,
    HttpClientModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  entryComponents: [ LoginComponent]
})
export class CoreModule { }
