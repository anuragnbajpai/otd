import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/state/session/session.service';
declare let navigator: any;
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(private route: ActivatedRoute, public stateSearch: SearchService, public stateSession: SessionService) { }

  ngOnInit() {
  }
  shared(){
    if(navigator.share) {
      navigator.share({
        title: this.stateSearch.compareProducts[0].title + ' vs ' + this.stateSearch.compareProducts[1].title ,
        url: window.location.href
      })
      .then(() => console.log('Share complete'))
      .error((error) => console.error('Could not share at this time', error))
      }
    }
}
