import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let el = document.getElementById('top');
    el.scrollIntoView(true);
    document.getElementById('top').scrollTop += 100;
  }

}
