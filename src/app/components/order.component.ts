import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { lineItem, Order } from '../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // to edit order
  @Input()
  order!:Order

  //to submit new order, to display in inventory
  @Output()
  onNewOrder = new Subject<Order>()
  
  // to submit order
  _order!: Order
  orderForm!: FormGroup // for ordercomp-html
  lineItemsArray!: FormArray

  constructor(private fb:FormBuilder) { }

  // ngOnInIt called once, when component is initialised 
  ngOnInit(): void {
    this.orderForm = this.createOrder(this.order)
    // @ts-ignore //
    // this.orderForm = this.createOrder(null)
  }

  // ngOnChanges gets called before ngOnInit and whenever a component's bound input is changed FROM THE PARENT COMPONENT.
  // used for editing
  ngOnChanges(changes: SimpleChanges): void {
    console.info(">>>ngOnChanges:: ", changes)
    console.info(">>> orderForm.dirty:: ", this.orderForm?.dirty)
    // if (this.orderForm?.dirty && !confirm('You have not saved your current edit, discard?')) {
    //   this.order=this._order //take input order and output as updated order
    //   return
    // }
    this.orderForm = this.createOrder(this.order)
    this._order=this.order //to ensure appcomponent order (from input()) is updated
  }

  addItem() {
    console.info(">>>addItem()")
    this.lineItemsArray.push(this.createLineItem())
  }

  removeItem(i:number) {
    console.info(">>>removeItem() at:: ", i)
    this.lineItemsArray.removeAt(i)
  }

  processOrder() {
    console.info(">>>processOrder() initialised")
    console.info("orderForm:: ", this.orderForm.value)
    const order: Order = this.orderForm.value as Order
    // if statement to make sure orderId is same aft submitting edit
    if (!!this.order?.orderId) {
      order.orderId = this.order.orderId //edit order from processOrder() = input() orderid
      // @ts-ignore
      this.order = null
      this._order = this.order
    }
    this.orderForm = this.createOrder()
    this.onNewOrder.next(order)
  }

  private createOrder(order?:Order): FormGroup {
    this.lineItemsArray = this.createLineItems(order?.lineItems || [])
    return this.fb.group({
      name: this.fb.control<string>(order?.name || ''),
      mobile: this.fb.control<string>(order?.mobile || ''),
      lineItems: this.lineItemsArray
    })
  }

  private createLineItem(li?: lineItem): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>(li?.item || ''),
      quantity: this.fb.control<number>(li?.quantity || 1)
    })
  }

  private createLineItems(lis: lineItem[] = []):FormArray {
    return this.fb.array(lis.map(li => this.createLineItem(li)))
  }

}
