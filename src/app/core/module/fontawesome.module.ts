import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faAddressBook, faInfo, faSearch, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare , faTwitterSquare, faInstagram} from '@fortawesome/free-brands-svg-icons';

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
      faInstagram
      );
  }
}
