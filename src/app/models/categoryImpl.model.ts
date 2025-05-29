// Import EntityName
import { Category } from "./category.model";

// Import relations
export class CategoryImpl implements Category {
    id: number = 0;
    name: string = '';
    status: string = '';
    imageUrl: string = '';

    constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }
}
