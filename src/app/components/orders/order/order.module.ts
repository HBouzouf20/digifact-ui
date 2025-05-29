import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddOrderComponent} from "./add-order/add-order.component";
import { AddOrderModule } from './add-order/add-order.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { EquipmentDetailModule } from '../../equipments/equipment-detail/equipment-detail.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagStatusModule } from '../../shared/tag-status/tag-status.module';
import { FormsModule } from '@angular/forms';
import {Ripple} from "primeng/ripple";

@NgModule({
    declarations: [
        OrderComponent,
    ],
    imports: [
        CommonModule,
        TableModule,
        OrderRoutingModule,
        DialogModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule,
        AddOrderModule,
        TagStatusModule,
        ButtonModule,
        EquipmentDetailModule,
        InputTextModule,
        DropdownModule,
        Ripple,

        FormsModule
    ]
})
export class OrderModule { }
