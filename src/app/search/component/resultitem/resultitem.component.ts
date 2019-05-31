import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { SearchService } from '../../state/search.service';

@Component({
  selector: 'app-resultitem',
  templateUrl: './resultitem.component.html',
  styleUrls: ['./resultitem.component.css']
})
export class ResultitemComponent implements OnInit {

  @Input() product: Product;
  @Input() rank: number;
  
  constructor(private router: Router, public stateSearch: SearchService) { }

  ngOnInit() {
  }

  detail() {
    this.stateSearch.compareProducts = [];
    this.stateSearch.searchResult.map(r => r.isCompare = false);
    this.router.navigate(['/search/' + this.product.category + '/' + this.product.title]);
  }

  addCompare(){
    this.stateSearch.updateProduct(null);
    if (this.product.isCompare) {
      this.stateSearch.compareProducts.push(this.product);
    } else {
      this.stateSearch.compareProducts.splice(this.stateSearch.compareProducts.indexOf(this.product), 1 );
    }
  }

}
