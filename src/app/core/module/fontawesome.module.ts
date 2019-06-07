import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faAddressBook, faInfo, faSearch, faArrowLeft,
  faHome, faPhone, faSort, faPlus, faList, faUser, faSlidersH, 
  faBookmark as faCircleSolid, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare , faTwitterSquare, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {  faThumbsUp, faThumbsDown, faBookmark as faCircleRegular } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FontawesomeModule {
  constructor() {
    library.add(faBars,
      faPhone,
      faAddressBook,
      faInfo,
      faHome,
      faSearch,
      faFacebookSquare,
      faTwitterSquare,
      faInstagram,
      faSort,
      faPlus,
      faThumbsDown,
      faThumbsUp,
      faList,
      faUser,
      faSlidersH,
      faArrowLeft,
      faCircleSolid,
      faCircleRegular,
      faShareAlt
      );
  }
}
