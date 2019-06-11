import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivationStart, ActivationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SessionService } from '../state/session/session.service';
import { filter } from 'rxjs/operators';
import { SearchService } from 'src/app/search/state/search.service';
import { LoginService } from '../service/login.service';
import { UiService } from '../service/ui.service';

@Injectable({
  providedIn: 'root'
})
export class RouteHandler {
  constructor(public router: Router, private titleService: Title, private metaService: Meta,
    private stateSession: SessionService, private stateSearch: SearchService,
    private svcLogin: LoginService, private route: ActivatedRoute, private svcUi: UiService) {
    this.initRouteTracking();

    this.route.queryParams.subscribe(params => {
      if (params.add) {
        this.svcUi.openDialog(params.add);
      }
    });

  }

  private initRouteTracking() {

    this.router.events.subscribe(event => {
      try {
        if (event instanceof ActivationStart) {
          this.updateStateRouteParameter(event);
        }
        if (event instanceof NavigationEnd) {

          this.updateTitleAndMetaTags(event);
          this.trackGoogleAnalytics(event);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  updateStateRouteParameter(event) {
    if (event.snapshot.data.page !== 'search' && event.snapshot.data.page !== 'detail') {
      this.stateSession.updateSearchKeyword('');
    }
    if (event.snapshot.params.category) {
      if (event.snapshot.params.category !== 'saved') {
        if (event.snapshot.params.category === 'best seller') {
          let search = sessionStorage.getItem('searchKeyword') ? sessionStorage.getItem('searchKeyword') : event.snapshot.params.category;
          this.stateSearch.UpdateCategory(search);
          this.stateSession.updateSearchKeyword(search);
        } else {
          this.stateSearch.UpdateCategory(event.snapshot.params.category);
          this.stateSession.updateSearchKeyword(event.snapshot.params.category);
          sessionStorage.setItem('searchKeyword', event.snapshot.params.category);
        }
      } else {

        this.stateSearch.UpdateCategory(event.snapshot.params.category);
        this.stateSession.updateSearchKeyword('');

      }
    }

    if (event.snapshot.params.product) {
      this.stateSearch.updateProduct(event.snapshot.params.product);
    }

    if (event.snapshot.params.compare1) {
      this.stateSearch.updateCompare1(event.snapshot.params.compare1);
    }
    if (event.snapshot.params.compare2) {
      this.stateSearch.updateCompare2(event.snapshot.params.compare2);
    }
  }

  updateTitleAndMetaTags(event) {
    let root = this.router.routerState.snapshot.root;
    while (root) {
      if (root.children && root.children.length) {
        root = root.children[0];
      } else if (root.data && root.data.title) {
        this.stateSession.updatePage(root.data.page);
        this.titleService.setTitle(root.data.title
          .replace(/{product}/g, root.params.category)
          .replace(/{item}/g, root.params.product) + ' | OnlyTopDeals');
        const tags = root.data.metatags;
        // tslint:disable-next-line:forin
        for (const tag in tags) {
          this.metaService.updateTag({
            name: tag, content: tags[tag]
              .replace(/{product}/g, root.params.category)
              .replace(/{item}/g, root.params.product)
          });
        }
        return;
      } else {
        return;
      }
    }
    (window as any).scrollTo(0, 0);
  }

  trackGoogleAnalytics(event) {
    (window as any).ga('set', 'page', event.urlAfterRedirects);
    (window as any).ga('send', 'pageview');
  }


}
