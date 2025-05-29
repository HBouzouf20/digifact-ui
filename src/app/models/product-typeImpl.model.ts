// Import EntityName
import { ProductType } from "./product-type.model";

// Import relations
export class ProductTypeImpl implements ProductType {
    id: number = 0;
    name: string = '';


    constructor(init?: Partial<ProductType>) {
        Object.assign(this, init);
    }
}
