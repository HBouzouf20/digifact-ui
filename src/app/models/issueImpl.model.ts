// Import EntityName
import { Issue } from "./issue.model";

// Import relations
export class IssueImpl implements Issue {
    id: number = 0;
    label: string = '';

    constructor(init?: Partial<Issue>) {
        Object.assign(this, init);
    }
}
