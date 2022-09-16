import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDB } from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // display orderId and name from order thru input (from appcomp)
  @Input()
  ordersDB!: OrderDB

  // pass uuid string as output to access and edit the chosen order
  @Output()
  onNewEdit = new Subject<string>()

  constructor() { }

  ngOnInit(): void {
  }

  // to edit existing order
  edit(key:string) {
    console.info(">>>edit() initialised")
    this.onNewEdit.next(key)
  }

}
