import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddCategoryComponent} from "./add-category/add-category.component";


@NgModule({
    declarations: [
        CategoryComponent,
        AddCategoryComponent,
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule

    ]
})
export class CategoryModule { }
