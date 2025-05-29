import { Brand } from "./brand.model";

import { Category } from "./category.model";

import { ProductType } from "./product-type.model";

import { Review } from "./review.model";

export interface Product {
    id?: number;
    imageUrl: string;
    title: string;
    price: number;
    purchasePrice: number;
    discount: number;
    quantity: number;
    description: string;
    featured: boolean;
    sellCount: number;
    brand: Brand;
    category: Category;
    condition: Condition;
}
export interface Condition {
    id: number;
    name: string;
}


