import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './equipment-routing.module';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddEquipmentComponent } from './add-equipments/add-equipments.component';
import { EquipmentComponent } from './equipment.component';
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";


@NgModule({
    declarations: [
        EquipmentComponent,
        AddEquipmentComponent,
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule,
        TableModule,
        IconFieldModule,
        InputIconModule,
        MultiSelectModule,
        DropdownModule,
        TagModule,
        FormsModule,
        CardModule

    ]
})
export class EquipmentModule { }
