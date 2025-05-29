import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddClientComponent} from "./add-client/add-client.component";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
    declarations: [
        ClientComponent,
        AddClientComponent,
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule,
        DynamicDialogModule,
        ToggleButtonModule
    ]
})
export class ClientModule { }
