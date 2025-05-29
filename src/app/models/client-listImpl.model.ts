// Import EntityName
import { ClientList } from "./client-list.model";

// Import relations
import { Client } from "./client.model";
import { ClientImpl } from "./clientImpl.model";


export class ClientListImpl implements ClientList {
    id: number = 0;
    listName: string = '';
    clients: Array<Client> = new Array<ClientImpl>();
    description: string = '';

    constructor(init?: Partial<ClientList>) {
        Object.assign(this, init);
    }
}
