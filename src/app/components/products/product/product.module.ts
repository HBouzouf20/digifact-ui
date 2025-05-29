import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddProductComponent} from "./add-product/add-product.component";


@NgModule({
    declarations: [
        ProductComponent,
        AddProductComponent,
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule

    ]
})
export class ProductModule { }
