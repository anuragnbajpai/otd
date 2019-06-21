import { SearchStore } from './search.store';
import { Injectable } from '@angular/core';
import { SearchQuery } from './search.query';
import { FirestoreService } from 'src/app/core/service/firestore.service';
import { Product } from '../model/product.model';
import { take, distinctUntilChanged, map } from 'rxjs/operators';
import { SessionService } from 'src/app/core/state/session/session.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  category$ = this.query.select(e => e.category);
  product$ = this.query.select(e => e.product);
  compare1$ = this.query.select(e => e.compare1);
  compare2$ = this.query.select(e => e.compare2);
  tab$ = this.query.select(e => e.tab);
  searchResult: Product[];
  selectedProduct: Product;
  compareProducts: Product[] = [];
  categories = [];
  constructor(private store: SearchStore, private query: SearchQuery,
              private svcFirestore: FirestoreService, private stateSession: SessionService) {

                this.svcFirestore.getCollection('categories').pipe(take(1)).subscribe(data => {
                  this.categories =  data.map(e => {
                    return  e.payload.doc.data();
                   });
                 });

                this.stateSession.country$.subscribe(c => {
      if(this.searchResult && this.searchResult.length > 0) {
        this.searchResult.forEach(p => {
          p.deals = [];
        });
        this.getDeals();
      }
    });
    
    // this.stateSession.user$.subscribe(c => {
    //   if(this.searchResult && this.searchResult.length > 0) {
    //     this.searchResult.forEach(p => {
    //       p.deals = [];
    //     });
    //     this.getDeals();
    //   }
    // });

    this.query.select(e => e.category).pipe(distinctUntilChanged()).subscribe(c => {
      if (c !== '') {
        this.searchResult = null;
        this.compareProducts = [];
        this.selectedProduct = null;
        this.updateProduct(null);
        if(c !== 'saved')
        {
        
        this.svcFirestore.getCollectionCondition('products', ref => ref.where('tags', 'array-contains', c.toLowerCase())
          .orderBy('avgRating', 'desc').limit(10)).pipe(take(1)).subscribe(data => {
            let user = this.stateSession.getUser();
            this.searchResult = data.map(e => {
              let d = e.payload.doc.data() as Product;
              if(user!= null){
                d.isSelected = user.saved.indexOf(d.id) > -1;
              } else {
                d.isSelected = false;
              }
              return d;
            }) as Product[];
            if (this.searchResult[0]) {
              if (this.getCompare1Product()) {
                this.getCompareList();
              } else {
                if (this.query.getValue().product !== '' &&
                  this.searchResult.findIndex(f => f.title === this.query.getValue().product) !== -1) {
                  this.updateProduct(this.query.getValue().product);
                  this.updateProductValue(this.query.getValue().product);
                  this.getTabData();
                } else {
                  this.updateProduct(this.searchResult[0].title);                  
                }
                setTimeout(() => {
                  let el = document.getElementById(this.query.getValue().product);
                  el.scrollIntoView(true);
                  window.scrollBy(0, -15);
                },
                  50);
              }
            }
          });
        } else {
          this.getSavedResult();
        }
      }
    });

    this.query.select(e => e.product).pipe(distinctUntilChanged()).subscribe(p => {
      if (this.searchResult && this.searchResult.length > 0) {
        this.updateProductValue(p);
        this.getTabData();
      }
    });

    this.query.select(e => e.tab).pipe(distinctUntilChanged()).subscribe(t => {
      if (this.searchResult && this.searchResult.length > 0) {
        this.getTabData();
      }
    });

    this.query.select(e => e.compare1).pipe(distinctUntilChanged()).subscribe(c => {

      if (this.searchResult && this.searchResult.length > 0) {
        this.getCompareList();
      }

    });
    this.query.select(e => e.compare2).pipe(distinctUntilChanged()).subscribe(c => {

      if (this.searchResult && this.searchResult.length > 0) {
        this.getCompareList();
      }

    });
  }

  getCompareList() {
    this.compareProducts = [];
    const cmpProduct1 = this.searchResult.find(f => f.title === this.getCompare1Product());
    const cmpProduct2 = this.searchResult.find(f => f.title === this.getCompare2Product());
    if (cmpProduct1) {
      this.compareProducts.push(cmpProduct1);
    }
    if (cmpProduct2) {
      this.compareProducts.push(cmpProduct2);
    }
    if (cmpProduct1 || cmpProduct2) {
      this.updateProduct(null);
      this.selectedProduct = null;
    }

  }
  getCompare1Product() {
    return this.query.getValue().compare1;
  }
  getCompare2Product() {
    return this.query.getValue().compare2;
  }
  getProduct() {
    return this.query.getValue().product;
  }
  getCategory() {
    return this.query.getValue().category;
  }
  getDeals() {
    this.svcFirestore.getDocument('deals', this.selectedProduct.id + '-' +this.stateSession.getCountry().code).subscribe(d => {
      this.selectedProduct.deals = (d.payload.data() as any).deals;
      this.searchResult.find(f => f.title === this.selectedProduct.title).deals = this.selectedProduct.deals;
    });
  }
  getImages() {
    this.svcFirestore.getDocument('images', this.selectedProduct.id).subscribe(d => {
      this.selectedProduct.images = (d.payload.data() as any).images;
      this.searchResult.find(f => f.title === this.selectedProduct.title).images = this.selectedProduct.images;
    });
  }
  getReviews() {
    this.svcFirestore.getDocument('reviews', this.selectedProduct.id).subscribe(d => {
      this.selectedProduct.reviews = (d.payload.data() as any).reviews;
      this.searchResult.find(f => f.title === this.selectedProduct.title).reviews = this.selectedProduct.reviews;
    });
  }
  updateProductValue(title) {
    this.updateCompare1(null);
    this.updateCompare2(null);
    this.selectedProduct = this.searchResult.find(f => f.title === title);
  }

  updateSearchResultItem(data){
    let selectedItem = this.searchResult.find(f => f.id === data.id);
    this.searchResult[this.searchResult.findIndex(f => f.id === data.id)] = {...selectedItem, ...data};
  }
  updateSavedStatusInSearchResult(){
    this.searchResult.find(f => f.title === this.selectedProduct.title).isSelected = this.selectedProduct.isSelected;
  }

  UpdateCategory(category) {
    this.store.update(state => ({ ...state, category }));
  }

  updateProduct(product) {
    this.store.update(state => ({ ...state, product }));
  }
  updateCompare1(compare1) {
    this.store.update(state => ({ ...state, compare1 }));
  }
  updateCompare2(compare2) {
    this.store.update(state => ({ ...state, compare2 }));
  }


  getTabValue() {
    return this.query.getValue().tab;
  }

  getTabData() {
    if (this.selectedProduct) {
      switch (this.getTabValue()) {
        case 'Images':
          if (this.selectedProduct.images == null || this.selectedProduct.images.length === 0) {
            this.getImages();
          }
          break;
        case 'Deals':
          if (this.selectedProduct.deals == null || this.selectedProduct.deals.length === 0) {
            this.getDeals();
          }
          break;
        case 'Reviews':
          if (this.selectedProduct.reviews == null || this.selectedProduct.reviews.length === 0) {
            this.getReviews();
          }
          break;
      }
    }
  }

  updateTab(tab) {
    this.store.update(state => ({ ...state, tab }));
  }

  getSavedResult(){
    let user = this.stateSession.getUser();
    this.searchResult = [];
    user.saved.forEach(s => {
      this.svcFirestore.getDocument('products', s).pipe( map(p => {
       let d = p.payload.data() as Product;
       d.isSelected= true;
       this.searchResult.push(d);
       this.selectProduct(d);
       return d;
      })).subscribe();
  
      
    });
  


  }

  selectProduct(product){

      if (this.getCompare1Product()) {
        this.getCompareList();
      } else {
        if (this.query.getValue().product !== '' &&
          this.searchResult.findIndex(f => f.title === this.query.getValue().product) !== -1) {
          this.updateProduct(this.query.getValue().product);
          this.updateProductValue(this.query.getValue().product);
          this.getTabData();
          setTimeout(() => {
            let el = document.getElementById(this.query.getValue().product);
            el.scrollIntoView(true);
            window.scrollBy(0, -15);
          },
            50);
        } else {
          this.updateProduct(this.searchResult[0].title);
        }   
    }
  }



}

