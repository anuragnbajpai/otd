import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './page/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: ':category',
        component: SearchComponent,
        data: {
          page: 'search',
          title: 'Top 10 {product}',
          metatags: {
            keywords: 'top {product}, top 10 {product}, best {product}, {product} deals',
            description: 'Top 10 {product} with reviews and deals information'
          }
        }
      },
      {
        path: ':category/:product',
        component: SearchComponent,
        data: {
          page: 'search',
          title: 'Top 10 {category}',
          metatags: {
            keywords: 'top {product}, top 10 {product}, best {product}, {product} deals',
            description: 'Top 10 {category} with reviews and deals information'
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
