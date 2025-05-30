import {Component, Input} from '@angular/core';
import {Client} from "../../models/client.model";
import {OrderItem} from "../../models/orderItem.model";

@Component({
    templateUrl: './invoice.component.html'
})
export class InvoiceComponent {

    @Input() type: any;
    @Input() client: Client | any;
    @Input() items: OrderItem | any;
}
