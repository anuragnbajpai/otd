import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './page/search/search.component';
import { ResultlistComponent } from './component/resultlist/resultlist.component';
import { ResultitemComponent } from './component/resultitem/resultitem.component';
import { DetailComponent } from './component/detail/detail.component';
import { CoreModule } from '../core/core.module';
import { AdsenseModule } from 'ng2-adsense';
import { CompareComponent } from './component/compare/compare.component';
import { ImageComponent } from './component/image/image.component';
import { VideoComponent } from './component/video/video.component';
import { DealComponent } from './component/deal/deal.component';
import { FeatureComponent } from './component/feature/feature.component';
import { ReviewComponent } from './component/review/review.component';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OverviewComponent } from './component/overview/overview.component';


@NgModule({
  declarations: [SearchComponent, ResultlistComponent, ResultitemComponent, 
    DetailComponent, CompareComponent, ImageComponent, DealComponent, VideoComponent,
    FeatureComponent, ReviewComponent, OverviewComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-6469787500519130',
      adSlot: '3548695446'
     }),
     NgxJsonLdModule
  ]
})
export class SearchModule { }
