import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoreService } from '../../service/core.service';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from '../../state/session/session.service';

@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.css']
})
export class SearchinputComponent implements OnInit {
  searchKeyword = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  constructor(private svcCore: CoreService, private router: Router, private stateSession: SessionService) {
    // this.svcCore.firestore.getCollectionCondition('categories', w => w.where('active', '==', true)).subscribe(data => {
    //   this.options =  data.map(e => {
    //        return  (e.payload.doc.data() as any).name;
    //       });
    //    });

    // this.options = [{
    //   group: 'Electronics',
    //   categories: ['Smartwatches', 'Tablets', 'Earphone', 'Smartphones', 'Laptops', 'Cameras', 'Tvs']
    // },
    // {
    //   group: 'Beauty',
    //   categories: ['Foundations for Summer', 'Foundations for Spring']
    // }];

    this.stateSession.searchKeyword$.subscribe(s => {
      this.searchKeyword.setValue(s);
    });
  }

  ngOnInit() {
    // this.searchKeyword.setValue(' ');
    // this.searchKeyword.setValue(this.svcSearch.searchKeyword);
    this.filteredOptions = this.searchKeyword.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

    
  }

  private _filterGroup(value: string) {
   // if (value) {
    //  this.svcCore.firestore.getCategory(value).subscribe(data => {
    //   let r =  data.map(e => e.payload.doc.data() );
    //   console.log(r);
    //  });

     return this.options
        .map(o => ({group: o.group, categories: this._filter(o.categories, value)}))
        .filter(o => o.categories.length > 0);
   // }

   // return this.stateGroups;
  }

 public _filter(opt: any[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.toLowerCase().includes(filterValue));
  }

  // public _filter(value: string, ): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  selected() {
    console.log(this.searchKeyword.value);
    this.router.navigate(['/search/' + this.searchKeyword.value]);
    document.getElementById('searchInput').blur();
  }
  clear() {
    this.options = this.stateSession.application.search;


    console.log(this.searchKeyword.value + 'call clear');
    this.searchKeyword.setValue('');
  }

  search() {
    this.router.navigate(['/search/' + this.searchKeyword.value]);
    document.getElementById('searchInput').blur();
  }
  filter() {
    this.router.navigate(['/search/' + this.searchKeyword.value], { queryParams: { add: 'filter' } });
    document.getElementById('searchInput').blur();
  }

}
