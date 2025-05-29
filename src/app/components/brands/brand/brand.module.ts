import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddBrandComponent} from "./add-brand/add-brand.component";


@NgModule({
    declarations: [
        BrandComponent,
        AddBrandComponent,
    ],
    imports: [
        CommonModule,
        BrandRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule

    ]
})
export class BrandModule { }
