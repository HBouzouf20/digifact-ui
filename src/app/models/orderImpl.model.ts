// Import EntityName
import { Order } from "./order.model";

// Import relations
import { Client } from "./client.model";
import { ClientImpl } from "./clientImpl.model";


import { Product } from "./product.model";
import { ProductImpl } from "./productImpl.model";
import {OrderItem} from "./orderItem.model";


export class OrderImpl implements Order {
    id: number = 0;
    paymentMethod: string = '';
    client: Client = new ClientImpl(); // If the type is unrecognized, default to null
    items: Array<OrderItem> = new Array<OrderItem>();
    paymentStatus: string = 'Not payed';
    createdAt: string = new Date().toISOString();

    constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }
}
