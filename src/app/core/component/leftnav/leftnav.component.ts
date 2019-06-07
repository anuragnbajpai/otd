import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {
  @Output() public leftNav = new EventEmitter();
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  close(){
    this.leftNav.emit(false);
  }
  login(){
    const url = this.router.url.split('?')[0];
    this.router.navigate([ decodeURIComponent(url) ], { queryParams: { login: true } });
  }
}
