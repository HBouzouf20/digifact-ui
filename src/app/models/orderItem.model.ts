import {Product} from "./product.model";

export interface OrderItem {
    equipment: Product;
    price: number;
    quantity: number;
    totalPrice: number;

}
