import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {
  @Output() public leftNav = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  close(){
    this.leftNav.emit(false);
  }
}
