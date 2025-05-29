// Import EntityName
import { Client } from "./client.model";


// Import relations
export class ClientImpl implements Client {
    id: number = 0;
    fullname: string = '';
    address: string = '';
    phone: string = '';
    @Reflect.metadata('optional', true)
    email?: string = '';

    constructor(init?: Partial<Client>) {
        Object.assign(this, init);

    }
}
