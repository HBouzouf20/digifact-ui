import {map} from 'rxjs';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {eq} from "@fullcalendar/core/internal-common";


@Component({
    selector: 'app-equipment-detail',
    templateUrl: './equipment-detail.component.html',
    styleUrl: './equipment-detail.component.scss'
})
export class EquipmentDetailComponent implements OnChanges, OnInit {

    @Input()
    isRepair = false;

    @Input()
    disableAll = false;

    @Input()
    disableTitle = true;

    @Input()
    disableQte = false;

    @Input()
    disableTotal = false;

    @Input()
    disablePrice = false;

    @Input()
    equipments: any;

    @Input()
    values : any;

    @Input()
    editOrder = false;

    @Input()
    orderValues : any;

    @Output()
    onChange = new EventEmitter;

    priceForm: FormGroup = this.fb.group({});


    constructor(private fb: FormBuilder) {
    }

    hasError(controlName: string, errorType: string, index : number): boolean {
        const control = this.prices.at(index).get(controlName);
        return (control?.hasError(errorType) && control?.touched)!!;
    }

    ngOnInit(): void {
        if(this.values) {
            this.priceForm = this.fb.group({
                prices: this.fb.array(this.values.map((e: any) => this.createItem(e)))
            });

        } else
        {
            this.priceForm = this.fb.group({
                prices: this.fb.array(this.equipments.map((e: any) => this.createPriceItem(e)))
            });
        }
    }
    createItem(value: any) { // never use validator on this fb

        let fb = this.fb.group({
            id: [value.id],
            sku: [value.equipment.sku],
            title: [value.equipment.title],
            price: [value.price],
            qte: [value.quantity],
            total: [value.totalPrice]
        });
        if (this.disableAll) {
            fb.get('title')?.disable();
            fb.get('qte')?.disable();
            fb.get('total')?.disable();
            fb.get('price')?.disable();
        }


        return fb;
    }


    change() {

        this.onChange.emit(this.priceForm.getRawValue().prices);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.values) {
            this.priceForm = this.fb.group({
                prices: this.fb.array(this.values.map((e: any) => this.createItem(e)))
            });

        }
        if (changes['equipments'] && !this.values) {
            const prevEquipments = changes['equipments'].previousValue || [];
            const currentEquipments = changes['equipments'].currentValue || [];

            const prevIds = new Set(prevEquipments.map((e: any) => e.id));
            const currentIds = new Set(currentEquipments.map((e: any) => e.id));

            const pricesArray = this.priceForm.get('prices') as FormArray ?? [];

            const addedEquipments = currentEquipments.filter((e: any) => !prevIds.has(e.id));
            addedEquipments.forEach((equip: any) => {
                pricesArray.push(this.createPriceItem(equip));
            });

            const removedIndexes: number[] = [];
            prevEquipments.forEach((e: any, index: number) => {
                if (!currentIds.has(e.id)) {
                    removedIndexes.push(index);
                }
            });

            removedIndexes.reverse().forEach((index) => {
                pricesArray.removeAt(index);
            });
            this.change()
        }
    }

    get prices(): FormArray {
        return this.priceForm?.get('prices') as FormArray;
    }

    getQuantity(equipment : any) {

        if(this.isRepair) {
            return 1
        }else if(this.editOrder) {
            let q = this.orderValues.find((v : any) => v.equipment.id === equipment.id)
            if(q)
            return q.quantity
        }

        return 1;
    }

    getId(equipment : any) {
        if(this.editOrder) {
            let q = this.orderValues.find((v : any) => v.equipment.id === equipment.id)

            if(q)
            return q.id

        }

        return equipment.id
    }

    getPrice(equipment : any) {

        if(this.editOrder) {
            let q = this.orderValues.find((v : any) => v.equipment.id === equipment.id)
            if(q)
            return q.price
        }
        return equipment.price
    }

    getTotalPrice(equipment : any) {

        if(this.editOrder) {
            let q = this.orderValues.find((v : any) => v.equipment.id === equipment.id)
            if(q)
            return q.totalPrice

        }

        return this.getPrice(equipment) * this.getQuantity(equipment);


    }

    createPriceItem(equipment: any): FormGroup {
        let fb = this.fb.group({
            id: [this.getId(equipment)],
            sku: [equipment.sku],
            title: [equipment.title],
            price: [this.getPrice(equipment), Validators.required],
            qte: [this.getQuantity(equipment), [Validators.required, Validators.max(equipment.quantity)]],
            total: [this.getTotalPrice(equipment), Validators.required]
        });
        if (this.disableTitle) fb.get('title')?.disable();
        if (this.disableQte) fb.get('qte')?.disable();
        if (this.disableTotal) fb.get('total')?.disable();
        if (this.disablePrice) fb.get('price')?.disable();

        return fb;
    }

    updateTotal(index: number) {

        if (this.prices) {
            const item = this.prices.at(index);
            const price = item.get('price')?.value || 0;
            const qte = item.get('qte')?.value || 1;
            item.patchValue({total: price * qte});
        }
    }
}
