import { Client } from "./client.model";

import { Product } from "./product.model";
import {PaymentStatus} from "./repair.model";
import {OrderItem} from "./orderItem.model";

export interface Order {
    id?: number;
    paymentMethod: string;
    client: Client;
    items: Array<OrderItem>;
    paymentStatus: string;
    createdAt: string;
}
