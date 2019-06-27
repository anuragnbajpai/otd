import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { SearchService } from '../../state/search.service';
import { CoreService } from 'src/app/core/service/core.service';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-resultitem',
  templateUrl: './resultitem.component.html',
  styleUrls: ['./resultitem.component.css']
})
export class ResultitemComponent implements OnInit {

  @Input() product: Product;
  @Input() rank: number;

  constructor(private router: Router, public stateSearch: SearchService,
    private svcCore: CoreService, private stateSession: SessionService) { }

  ngOnInit() {
  }

  detail() {
    this.stateSearch.compareProducts = [];
    this.stateSearch.searchResult.map(r => r.isCompare = false);
    this.router.navigate(['/search/' + this.stateSearch.getCategory() + '/' + this.product.title]);
  }

  addCompare() {
    this.stateSearch.updateProduct(null);
    if (!this.product.isCompare) {
      if (this.stateSearch.compareProducts.length > 1) {
        this.svcCore.snackbar.Confirmation('Only two products can be compared');
        return;
      }
      if (this.stateSearch.compareProducts.length === 1) {
        if(this.product.category !== this.stateSearch.compareProducts[0].category){
          this.svcCore.snackbar.Confirmation('Cant compare, product category doesnt match');
          return;
        }
      }
      this.stateSearch.compareProducts.push(this.product);

      if (this.stateSearch.compareProducts.length === 1) {
        
        if (this.stateSession.getDevice() !== 'xs') {
         // this.stateSearch.updateProduct(null);
          this.router.navigate(['/search/' + this.stateSearch.getCategory() + '/compare/' + this.product.title]);
        }
      }

    } else {
      this.stateSearch.compareProducts.splice(this.stateSearch.compareProducts.indexOf(this.product), 1);
    }

    if (this.stateSearch.compareProducts.length === 2) {
      //this.stateSearch.updateProduct(null);
      // tslint:disable-next-line:max-line-length
      this.router.navigate(['/search/' + this.stateSearch.getCategory() + '/compare/' + this.stateSearch.compareProducts[0].title + '/' + this.stateSearch.compareProducts[1].title]);
    }
    this.product.isCompare = !this.product.isCompare;

  }

}
