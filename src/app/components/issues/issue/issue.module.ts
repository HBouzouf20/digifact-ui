import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import {DialogModule} from "primeng/dialog";
import {GeneratorTableModule} from "../../shared/generator-table/generator-table.module";
import {GeneratorFormModule} from "../../shared/generator-form/generator-form.module";
import {ToastModule} from "primeng/toast";
import { GeneratorDetailModule } from '../../shared/generator-detail/generator-detail.module';
import { TranslateModule } from '@ngx-translate/core';
import {AddIssueComponent} from "./add-issue/add-issue.component";


@NgModule({
    declarations: [
        IssueComponent,
        AddIssueComponent,
    ],
    imports: [
        CommonModule,
        IssueRoutingModule,
        DialogModule,
        GeneratorTableModule,
        GeneratorFormModule,
        ToastModule,
        GeneratorDetailModule,
        TranslateModule

    ]
})
export class IssueModule { }
