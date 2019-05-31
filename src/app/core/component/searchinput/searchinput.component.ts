import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoreService } from '../../service/core.service';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.css']
})
export class SearchinputComponent implements OnInit {
  searchKeyword = new FormControl();
  options =[];
  filteredOptions: Observable<string[]>;
  constructor(private svcCore: CoreService, private router: Router) { 
    this.svcCore.firestore.getCollectionCondition('categories', w => w.where('active', '==', true)).subscribe(data => {
      this.options =  data.map(e => {
           return  (e.payload.doc.data() as any).name;
          });
       });
  }

  ngOnInit() {
     // this.searchKeyword.setValue(this.svcSearch.searchKeyword);
    this.filteredOptions = this.searchKeyword.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

   private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    selected()
    {
      console.log(this.searchKeyword.value);
      this.router.navigate(['/search/'+ this.searchKeyword.value]);
      document.getElementById('searchInput').blur();
    }
    clear(){
      console.log(this.searchKeyword.value + 'call clear')
      this.searchKeyword.setValue('')
    }

}
