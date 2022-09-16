export interface lineItem {
    item: string
    quantity: number
}

export interface Order {
    orderId?: string
    name: string
    mobile: string
    lineItems: lineItem[]
}

export type OrderDB = {
    [key:string]: Order
}