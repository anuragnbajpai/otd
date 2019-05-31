import { SearchStore } from './search.store';
import { Injectable } from '@angular/core';
import { SearchQuery } from './search.query';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { Product } from '../model/product.model';
import { take, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  category$ = this.query.select(e => e.category);
  product$ = this.query.select(e => e.product);
  searchResult: Product[];
  selectedProduct: Product;
  compareProducts: Product[] = [];

  constructor(private store: SearchStore, private query: SearchQuery, private svcFirestore: FirestoreService) {
    this.query.select(e => e.category).pipe(distinctUntilChanged()).subscribe(c => {
      if (c !== '') {
        this.searchResult = null;
        this.compareProducts = [];
        this.selectedProduct = null;
        this.updateProduct(null);
        this.svcFirestore.getCollectionCondition('products', ref => ref.where('category', '==', c)
          .orderBy('avgRating', 'desc').limit(10)).pipe(take(1)).subscribe(data => {
            this.searchResult = data.map(e => e.payload.doc.data()) as Product[];
            if (this.searchResult[0] ) {
              if(this.query.getValue().product !== '' &&
               this.searchResult.findIndex(f => f.title === this.query.getValue().product) !== -1) {
                this.updateProduct(this.query.getValue().product);
                this.updateProductValue(this.query.getValue().product);
                setTimeout(() => {
                  let el = document.getElementById(this.query.getValue().product);
                  el.scrollIntoView();
                },
                  50);
              } else {
                this.updateProduct(this.searchResult[0].title);
              }
            }
          });
      }
    });

    this.query.select(e => e.product).pipe(distinctUntilChanged()).subscribe(p => {
      if (this.searchResult && this.searchResult.length > 0) {
        this.updateProductValue(p);
      }
    });
  }


  getDeals(){
    this.svcFirestore.getDocument('deals', this.selectedProduct.id).subscribe(d => {
      this.selectedProduct.deals = (d.payload.data() as any).deals;
      this.searchResult.find(f => f.title === this.selectedProduct.title).deals = this.selectedProduct.deals;
    });
  }
  getImages(){
    this.svcFirestore.getDocument('images',  this.selectedProduct.id).subscribe(d => {
      this.selectedProduct.images =  (d.payload.data() as any).images;
      this.searchResult.find(f => f.title === this.selectedProduct.title).images = this.selectedProduct.images;
      });
  }
  updateProductValue(title){
    this.selectedProduct = this.searchResult.find(f => f.title === title);
  }

  UpdateCategory(category) {
    this.store.update(state => ({ ...state, category }));
  }

  updateProduct(product) {
    this.store.update(state => ({ ...state, product }));
  }



}

