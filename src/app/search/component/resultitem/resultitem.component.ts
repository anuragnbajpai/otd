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
    this.router.navigate(['/search/' + this.product.category + '/' + this.product.title]);
  }

  addCompare() {

    if (!this.product.isCompare) {
      if (this.stateSearch.compareProducts.length > 1) {
        this.svcCore.toast.showToast(this.svcCore.toast.toastStatus.Error, 'Please unselect,We compare only two products');
        return;
      }
      this.stateSearch.compareProducts.push(this.product);

      if (this.stateSearch.compareProducts.length === 1) {
        this.stateSearch.updateProduct(null);
        if (this.stateSession.getDevice() !== 'xs') {
          this.router.navigate(['/search/' + this.product.category + '/compare/' + this.product.title]);
        }
      }

    } else {
      this.stateSearch.compareProducts.splice(this.stateSearch.compareProducts.indexOf(this.product), 1);
    }

    if (this.stateSearch.compareProducts.length === 2) {
      this.stateSearch.updateProduct(null);
      // tslint:disable-next-line:max-line-length
      this.router.navigate(['/search/' + this.product.category + '/compare/' + this.stateSearch.compareProducts[0].title + '/' + this.stateSearch.compareProducts[1].title]);
    }
    this.product.isCompare = !this.product.isCompare;

  }

}
