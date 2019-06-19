import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './page/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: ':category/:product',
        component: SearchComponent,
        data: {
          page: 'detail',
          title: 'Top 10 {category} : {product}',
          metatags: {
            keywords: 'top {category}, top 10 {category}, best {category}, {category} deals',
            description: 'Top 10 {category} with reviews and deals information'
          }
        }
      },
      {
        path: ':category',
        component: SearchComponent,
        data: {
          page: 'search',
          title: 'Top 10 {category}',
          metatags: {
            keywords: 'top {category}, top 10 {category}, best {category}, {category} deals',
            description: 'Top 10 {category} with reviews and deals information'
          }
        }
      },
      {
        path: ':category/compare/:compare1',
        component: SearchComponent,
        data: {
          page: 'compare',
          title: 'Top 10 {category}',
          metatags: {
            keywords: 'top {category}, top 10 {category}, best {category}, {category} deals',
            description: 'Top 10 {category} with reviews and deals information'
          }
        }
      },
      {
        path: ':category/compare/:compare1/:compare2',
        component: SearchComponent,
        data: {
          page: 'compare',
          title: 'Top 10 {category}',
          metatags: {
            keywords: 'top {product}, top 10 {product}, best {product}, {product} deals',
            description: 'Top 10 {category} with reviews and deals information'
          }
        }
      },
      {
        path: '',
        redirectTo: 'best seller',
        pathMatch: 'full',
        data: {
          page: 'search'
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
