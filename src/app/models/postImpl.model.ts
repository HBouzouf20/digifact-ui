// Import EntityName
import { Post } from "./post.model";

// Import relations
export class PostImpl implements Post {
    id: number = 0;
    title: string = '';
    urlLink: string = '';
    imageUrl: string = '';

    constructor(init?: Partial<Post>) {
        Object.assign(this, init);
    }
}
