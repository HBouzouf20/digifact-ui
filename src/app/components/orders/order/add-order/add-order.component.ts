//.concat('/demo')
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { OrderImpl } from 'src/app/models/orderImpl.model';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ToastService } from 'src/app/layout/toast.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AddClientComponent } from 'src/app/components/clients/client/add-client/add-client.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceService } from 'src/app/services/invoice.service';
import JsBarcode from 'jsbarcode';
import { ClientImpl } from 'src/app/models/clientImpl.model';

@Component({
    selector: 'app-add-order',
    templateUrl: './add-order.component.html',
    styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit, AfterViewInit {
    @ViewChild('barcode', { static: true }) barcodeElement:
        | ElementRef
        | undefined;

    showErrors = false;
    clientType = [{ state: 'Known' }, { state: 'Unknown' }];
    unknownClient = false;
    title = 'Add Order';
    status: any;
    currentClient: Client = new ClientImpl();
    editMode = false;
    paymentStatus: any = [
        { value: 'Payed', state: 'PAYED' },
        { value: 'Not payed', state: 'NOT_PAYED' },
    ];
    brands: any;
    @Input()
    formData: any = {};
    editTitle = 'Edit Order';
    equipments: any = [];
    clients: any;
    selectedEquipments: any = [];
    state: any;
    ref: DynamicDialogRef | undefined;
    addEvent = new EventEmitter();

    constructor(
        private orderService: OrderService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        public dialogService: DialogService,
        private clientService: ClientService,
        private fb: FormBuilder,
        private equipmentService: ProductService,
        private toast: ToastService,
        private invoice: InvoiceService,
        private router: Router
    ) {
        if (this.router.getCurrentNavigation()?.extras.state) {
            this.state = this.router.getCurrentNavigation()?.extras.state;
        }
    }

    order = this.fb.group({
        reference: [this.generateRandom() + ''],
        equipment: [[], Validators.required],
        equipmentPrices: [[], Validators.required],
        client: ['', Validators.required],
        date: [new Date()],
        paymentStatus: [{ value: 'Not payed', state: 'NOT_PAYED' }],
        fullname: ['', Validators.required],
        phone: ['', Validators.required],
    });

    ngOnInit() {
        if (this.state) {
            this.formData = JSON.parse(this.state.formData);
            this.editMode = true;
        } else if (!this.route.snapshot.url.toString().includes('add')) {
            this.router.navigate(['/orders']);
        }

        this.order.get('reference')?.disable();
        this.order.get('date')?.disable();

        this.equipmentService.getAllProducts().subscribe((equipments: any) => {
            this.equipments = equipments;
            if (this.editMode) {
                this.order.patchValue({
                    equipment: this.formData.items.map(
                        (e: any) => e.equipment.sku
                    ),
                });
            }
        });
        let id : any = null;
        if(this.formData) {
            if(this.formData.client && this.formData.client.id) {
                id = this.formData.client.id;
            }
        }


        this.clientService.getAllClients().subscribe((clients: any) => {
            this.clients = clients;
            this.order.patchValue({ client: id });
        });

        setTimeout(() => {
            const reference = this.order.get('reference')?.value;
            if (reference) {
                this.generateBarcode(reference);
            }
        }, 0);
    }

    updateFormValue() {
        this.unknownClient = this.formData.client.type !== 'Known';
        this.order.patchValue({
            reference: this.formData.reference,
            date: new Date(this.formData.date ?? Date.now()),

            phone: this.formData.client.phone,
            fullname: this.formData.client.fullname,
            paymentStatus: this.paymentStatus.find(
                (p: any) => p.value === this.formData.paymentStatus
            ),
        });
    }

    ngAfterViewInit() {
        if (this.formData && this.formData.state) {
            this.updateFormValue();
            this.editMode = true;
            if (this.editMode) {
                this.order.get('fullname')?.disable();
                this.order.get('phone')?.disable();
                this.order.get('equipments')?.disable();
                this.order.get('brand')?.disable();
                this.order.get('client')?.disable();
            }
        }
    }

    changeClient(event: any) {
        this.unknownClient = event.checked;
        if (this.unknownClient) {
            this.order.get('client')?.clearValidators();
            this.order.get('client')?.updateValueAndValidity();

            this.order.get('fullname')?.setValidators(Validators.required);
            this.order.get('fullname')?.updateValueAndValidity();

            this.order.get('phone')?.setValidators(Validators.required);
            this.order.get('phone')?.updateValueAndValidity();
        } else {
            this.order.get('client')?.setValidators(Validators.required);
            this.order.get('client')?.updateValueAndValidity();

            this.order.get('fullname')?.clearValidators();
            this.order.get('fullname')?.updateValueAndValidity();

            this.order.get('phone')?.clearValidators();
            this.order.get('phone')?.updateValueAndValidity();
        }
    }

    equipmentPrices(prices: any) {
        this.order.patchValue({ equipmentPrices: prices });
    }

    getEquipments(selectedEquipments: any) {
        const filteredProducts = this.equipments.filter((equipment: any) =>
            selectedEquipments.includes(equipment.sku)
        );
        return filteredProducts;
    }

    getValues() {
        if (this.editMode) {
            return this.formData.items;
        }
        return [];
    }

    changeEquipments(change: any) {
        this.selectedEquipments = change.value;
    }

    syncClient() {
        this.clientService.getAllClients().subscribe((clients: any) => {
            this.clients = clients;
        });
    }

    addClient() {
        this.ref = this.dialogService.open(AddClientComponent, {
            header: 'Add Client',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
            data: {
                isModal: true,
            },
        });
    }

    hasError(controlName: string, errorType: string): boolean {
        const control = this.order.get(controlName);

        return (
            (control?.hasError(errorType) && control?.touched)!! ||
            (control?.hasError(errorType) && this.showErrors)!!
        );
    }

    generateRandom() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    generateBarcode(reference: string): void {
        if (reference && this.barcodeElement) {
            JsBarcode(this.barcodeElement.nativeElement, reference, {
                format: 'CODE128',
                lineColor: 'black',
                width: 2,
                height: 30,
                displayValue: true,
            });
        }
    }

    addOrder() {
        if (this.unknownClient) {
            this.order.get('client')?.disable();
        } else {
            this.order.get('fullname')?.disable();
            this.order.get('phone')?.disable();
        }


        if (!this.order.valid) {
            this.showErrors = true;
            return;
        }
        const orderForm = this.order.getRawValue();
        console.log(this.order)
        this.currentClient = this.getClient(this.order);
        console.log(this.currentClient);

        const items = this.transformEquipmentPrices(
            orderForm.equipmentPrices || [],
            orderForm.equipment || []
        );

        let order: any = {
            ...(this.editMode && { id: this.formData.id }),
            ...(!this.editMode && { id: null }),
            reference: orderForm.reference || '',
            items,
            client: this.currentClient,
            orderDate: orderForm.date || '',
            paymentStatus: orderForm.paymentStatus?.value || 'Not payed',
        };

        const request = this.editMode
            ? this.orderService.updateOrder(order.id, order)
            : this.orderService.addOrder(order);

        request.subscribe({
            next: () => {
                this.toast.showSuccess(
                    `Order was ${
                        this.editMode ? 'updated' : 'added'
                    } successfully!`
                );
                this.router.navigate(['/orders']);
            },
            error: (err) =>{
                this.toast.showError(err.error?.error || 'An unexpected error occurred');
                this.toast.showError(
                    `Failed to ${
                        this.editMode ? 'update' : 'add'
                    } Order. Please try again.`
                )
            }

        });
    }

    private transformEquipmentPrices(
        equipmentPrices: any[],
        equipments: any[]
    ) {
        return equipmentPrices.map((item) => {
            const matchingEquipment = equipments.find(
                (e) => e.sku === item.sku
            );
            const existingItem = this.editMode
                ? this.formData.items.find(
                      (f: any) => f.equipment.sku === item.sku
                  )
                : null;

            return {
                id: this.editMode ? existingItem?.id || '' : '',
                equipment: {
                    id: matchingEquipment?.id || item.id,
                    sku: matchingEquipment?.sku || item.sku,
                    title: matchingEquipment?.title || item.title,
                },
                quantity: item.qte,
                totalPrice: item.total,
                price: item.price,
            };
        });
    }

    protected getClient(repairForm: any) {
        repairForm = repairForm.getRawValue();
        if (this.unknownClient) {
            console.log('this.unknownClient', this.unknownClient)
            return {
                id: 0,
                phone: repairForm.phone || '',
                fullname: repairForm.fullname || '',
                type: this.clientType[1].state,
            };
        }

        const existingClient = this.clients.find(
            (client: { id: string | null }) => client.id === repairForm.client
        );
        return {
            id: repairForm.client,
            phone: existingClient?.phone || '',
            fullname: existingClient?.fullname || '',
            type: this.clientType[0].state,
        };
    }
}
