import {OrderItem} from "./orderItem.model";
import {ProductImpl} from "./productImpl.model";
import {Product} from "./product.model";

export class OrderItemImpl implements OrderItem {
    equipment: Product = new ProductImpl();
    price: number = 0;
    quantity: number = 0;
    totalPrice: number = 0;

    constructor(init?: Partial<OrderItem>) {
        Object.assign(this, init);
    }
}
