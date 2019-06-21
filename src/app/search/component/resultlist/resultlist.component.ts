import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../state/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

  constructor(public stateSearch: SearchService,private route: ActivatedRoute, private router: Router,
              public stateSession: SessionService) { }

  ngOnInit() {
  }
  addProduct(){
    this.stateSearch.selectedProduct = null;
    const url = this.router.url.split('?')[0];
    this.router.navigate([ decodeURIComponent(url) ], { queryParams: { add: 'product' } });
  }
}
