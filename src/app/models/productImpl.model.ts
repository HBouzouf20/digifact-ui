// Import EntityName
import {Condition, Product} from "./product.model";

// Import relations
import { Brand } from "./brand.model";
import { BrandImpl } from "./brandImpl.model";


import { Category } from "./category.model";
import { CategoryImpl } from "./categoryImpl.model";


import { ProductType } from "./product-type.model";
import { ProductTypeImpl } from "./product-typeImpl.model";


import { Review } from "./review.model";
import { ReviewImpl } from "./reviewImpl.model";


export class ProductImpl implements Product {
    id: number = 0;
    title: string = '';
    price: number = 0.0;
    @Reflect.metadata('optional', true)
    purchasePrice: number = 0.0;
    @Reflect.metadata('optional', true)
    discount: number = 0.0;
    quantity: number = 0;
    description: string = '';
    @Reflect.metadata('optional', true)
    sellCount: number = 0;
    @Reflect.metadata('optional', true)
    condition: Condition = Conditions.New;
    brand: Brand = new BrandImpl(); // If the type is unrecognized, default to null
    category: Category = new CategoryImpl(); // If the type is unrecognized, default to null
    imageUrl: string = '';
    featured: boolean = false;

    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}
export const Conditions = {
    New: {id: 1, name: "NEW"},
    Used: {id: 2, name: "USED"},
    repair: {id: 3, name: "REPAIR"}
};
export function findConditionByName(name: string) {
    return Object.values(Conditions).find((condition) => condition.name === name);
}
