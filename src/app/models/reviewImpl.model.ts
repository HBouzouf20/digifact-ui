// Import EntityName
import { Review } from "./review.model";

// Import relations
export class ReviewImpl implements Review {
    id: number = 0;
    user: string = '';
    name: string = '';
    email: string = '';
    review: string = '';
    date: string = '';

    constructor(init?: Partial<Review>) {
        Object.assign(this, init);
    }
}
