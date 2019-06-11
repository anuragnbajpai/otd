import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/page/home/home.component';
import { ContactusComponent } from './core/page/contactus/contactus.component';
import { AboutusComponent } from './core/page/aboutus/aboutus.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  data: {
    page: 'home',
    title: 'One Stop Shop for Deals',
    metatags: {
      keywords: 'onlytopdeals, only top deals, top 10 items, best deals, deals',
      description: `OnlyTopDeals is a product review platform were user can check and submit ratings.
       find top 10 reviewed products with feature details and customer images.
       We provide single place where user can find deals from multiple 
       online stores with an option to post deals if they have better offer.`
    }
  }
},
{
  path: 'contactus',
  component: ContactusComponent,
  data: {
    title: 'Contact us',
    metatags: {
      page: 'contactus',
      keywords: 'onlytopdeals, only top deals, top 10, best, deals',
      description: 'We’d love to hear from you. If you want to share your feedback, suggestion or ask any question. Please email us'
    }
  }
},
{
  path: 'saved',
  loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
},
{
  path: 'aboutus',
  component: AboutusComponent,
  data: {
    page: 'aboutus',
    title: 'About us',
    metatags: {
      keywords: 'onlytopdeals, only top deals, top 10, best, deals, about us',
      description: ` OTD is exactly what it sounds like! Top deals curated for any given product, e.g. earbuds. How
            did we decide what products deserve to be on our list? It’s simple - based on factors such as
            price, quality, worth, popularity, and reviews.`
    }
  }
},
{ path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
data: {
  page: 'search'
}
},

{ path: '**', redirectTo: '', pathMatch: 'full' }
];
// { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminRouteGuard] },
@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
