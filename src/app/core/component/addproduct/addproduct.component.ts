import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/search/state/search.service';
import { SessionService } from '../../state/session/session.service';
import { startWith, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../service/firestore.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  @ViewChild('stepper', {static: false}) stepper;
  productFormGroup: FormGroup;
  featuresFormGroup: FormGroup;
  options =[];
  featureList = [];
  filteredOptions: Observable<string[]>;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, public stateSearch: SearchService, 
              private router: Router, public stateSession: SessionService, private svcFirestore: FirestoreService) {
    if(this.stateSearch.selectedProduct){
      this.productFormGroup = this.formBuilder.group({
        brand: [this.stateSearch.selectedProduct.brand, [Validators.required]],
        title: [this.stateSearch.selectedProduct.title, [Validators.required]],
        description: [this.stateSearch.selectedProduct.description, [Validators.required, Validators.minLength(10)]],
        category: [this.stateSearch.selectedProduct.category, Validators.required],
        picture: [this.stateSearch.selectedProduct.picture, [Validators.required]],
        price: this.addCountry(),
        avgRating: [this.stateSearch.selectedProduct.avgRating, Validators.required],
        id: [this.stateSearch.selectedProduct.id, Validators.required],
        tags: [this.stateSearch.selectedProduct.tags],
      //  ranking: [this.stateSearch.selectedProduct.ranking, Validators.required],
        active: [true, Validators.required],
        dateTime: [new Date(), Validators.required]
      });
      this.featuresFormGroup = this.formBuilder.group({
        features: this.formBuilder.array([])
      });
      this.initFeatures();
    } else {
      this.productFormGroup = this.formBuilder.group({
        brand: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        category: ['', Validators.required],
        picture: ['', [Validators.required]],
        price: this.addCountry(),
        id : this.svcFirestore.firestore.createId(),
        avgRating: [0, Validators.required],
        tags: [ []],
       // ranking: [1, Validators.required],
        active: [true, Validators.required],
        dateTime: [new Date(), Validators.required]
      });

      // this.stateSession.countries.array.forEach(element => {
      //   (this.productFormGroup.get('price') as FormArray).push( this.formBuilder.control(false));
      // });
      this.featuresFormGroup = this.formBuilder.group({
        features: this.formBuilder.array([])
      });
    }
    

  }
  addCountry(){
      let fg = this.formBuilder.group({});
      this.stateSession.countries.forEach(c => {
        if(this.stateSearch.selectedProduct){
          fg.addControl(c.code, new FormControl(this.stateSearch.selectedProduct.price[c.code], Validators.required) );
        } else {
          fg.addControl(c.code, new FormControl(null, Validators.required) );
        }
       
      });
      return fg;
  }
  ngOnInit() {
    this.options = this.stateSearch.categories.map(o => o.name);
    this.filteredOptions = this.productFormGroup.get('category').valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value))
     );
 }

  private _filter(value: string): string[] {
     const filterValue = value.toLowerCase();

     return this.options.filter(option => option.toLowerCase().includes(filterValue));
   }

  createFeature(property): FormGroup {
    // let l = this._detail.features.filter(f => f.key=== property)[0].value ;
     return this.formBuilder.group({
       key: [property, Validators.required],
       value: [ this.stateSearch.selectedProduct? this.stateSearch.selectedProduct.features.filter(f => f.key=== property)[0].value : '', Validators.required]
     });
   }
   initFeatures(){
     (this.featuresFormGroup.get('features') as FormArray).controls = [];
     if(this.stateSearch.selectedProduct){
      this.stateSearch.selectedProduct.features.forEach(i => {
        (this.featuresFormGroup.get('features') as FormArray).push(this.createFeature(i.key));
      });
    } else {
      this.featureList.forEach(i => {
        (this.featuresFormGroup.get('features') as FormArray).push(this.createFeature(i));
      });
    }
    


   }

   updateProduct(){
    this.dialog.closeAll();
   //  console.log(this.featuresFormGroup.value);
    this.productFormGroup.value.features = this.featuresFormGroup.value.features;
    console.log(this.productFormGroup.value);
    this.stateSearch.selectedProduct = {...this.stateSearch.selectedProduct, ...this.productFormGroup.value} ;
    this.stateSearch.updateSearchResultItem(this.stateSearch.selectedProduct);
    this.svcFirestore.updateItem('products', this.productFormGroup.value);
   }

   addProduct(){
    this.dialog.closeAll();
   //  console.log(this.featuresFormGroup.value);
    
    this.productFormGroup.controls.tags.setValue([this.productFormGroup.controls.title.value.toLowerCase(),
      this.productFormGroup.controls.brand.value.toLowerCase(),
      this.productFormGroup.controls.category.value.toLowerCase()]);
    this.productFormGroup.value.features = this.featuresFormGroup.value.features;
    console.log(this.productFormGroup.value);
    this.stateSearch.selectedProduct = this.productFormGroup.value ;
    this.stateSearch.searchResult.push(this.productFormGroup.value);
    this.svcFirestore.createDocument('products', this.productFormGroup.value);
    this.redirectDetail();
   }

   onCategoryChange(e){
    this.featureList = this.stateSearch.categories.find(c => c.name === this.productFormGroup.controls.category.value).features;
    this.initFeatures();
  }
  redirectDetail() {
    this.stateSearch.compareProducts = [];
    this.stateSearch.searchResult.map(r => r.isCompare = false);
    this.router.navigate(['/search/' + this.stateSearch.getCategory() + '/' + this.productFormGroup.controls.title.value.toLowerCase()]);
  }
}
