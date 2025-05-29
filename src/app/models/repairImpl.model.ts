// Import EntityName
import { EquipmentPrice, PaymentStatus, PaymentStatusImpl, Repair, Status, StatusImpl } from "./repair.model";

// Import relations
import { Product } from "./product.model";
import { ProductImpl } from "./productImpl.model";


import { Client } from "./client.model";
import { ClientImpl } from "./clientImpl.model";


export class RepairImpl implements Repair {
   
    product: Product = new ProductImpl(); // If the type is unrecognized, default to null
    paymentStatus: PaymentStatus = new PaymentStatusImpl('Not payed');
   
    constructor(init?: Partial<Repair>) {
        Object.assign(this, init);
    }
    id?: number | undefined;
    reference: string = '';
    equipment: string[] = [];
    productReference: number = 0;
    brand: number = 0;
    equipmentPrices: EquipmentPrice[] = new Array<EquipmentPrice>();
    client: string = "";
    dateDepot: string = "";
    issue: string = "";
    status: Status = new StatusImpl('Pending');
    price: number = 0;
   
}
