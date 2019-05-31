import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('admin route guard')
    // if (state.url.toString().endsWith('401')) {
    //     console.log(state.url.toString().endsWith('401'));
    //     return true;
    // }
    // return false;
    return true;
  }
  constructor(private router: Router) {

  }
}