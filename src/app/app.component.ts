import { Component } from '@angular/core';
import { Order, OrderDB } from './models';
import { v4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day32wsOrder';

  ordersDB: OrderDB = {}
  order!: Order

  processNewOrder(newOrder: Order) {
    console.info(">>> new add to order processNewOrder:: ",newOrder)
    let orderId = !newOrder.orderId? v4().substring(0,8): newOrder.orderId
    newOrder.orderId = orderId
    this.ordersDB = { ... this.ordersDB, [orderId]: newOrder}
  }

  editOrder(key:string) {
    console.info(">>> editOrder initialised:: ",key)
    this.order=this.ordersDB[key]
  }
}
