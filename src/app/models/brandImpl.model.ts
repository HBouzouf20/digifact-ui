// Import EntityName
import { Brand } from "./brand.model";

// Import relations
export class BrandImpl implements Brand {
    id: number = 0;
    name: string = '';
    description: string = '';
    email: string = '';
    active: boolean = true;
    imageUrl: string = '';

    constructor(init?: Partial<Brand>) {
        Object.assign(this, init);
    }
}
