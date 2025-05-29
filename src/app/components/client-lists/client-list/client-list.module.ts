import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListRoutingModule } from './client-list-routing.module';
import { ClientListComponent } from './client-list.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddClientListComponent} from "./add-client-list/add-client-list.component";


@NgModule({
    declarations: [
        ClientListComponent,
        AddClientListComponent,
    ],
    imports: [
        CommonModule,
        ClientListRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule

    ]
})
export class ClientListModule { }
