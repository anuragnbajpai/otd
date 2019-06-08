import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
declare let navigator: any;
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(private route: ActivatedRoute, public stateSearch: SearchService) { }

  ngOnInit() {
  }
  shared(){
    if(navigator.share) {
      navigator.share({
        title: this.stateSearch.selectedProduct.title,
        text: this.stateSearch.selectedProduct.description,
        url: environment.siteUrl + this.route.url
      })
      .then(() => console.log('Share complete'))
      .error((error) => console.error('Could not share at this time', error))
      }
    }
}
