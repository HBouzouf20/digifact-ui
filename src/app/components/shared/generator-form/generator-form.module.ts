import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorFormComponent } from './generator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { UploaderModule } from '../generator-uploader/uploader.module';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';
import { GeneratorTableModule } from '../generator-table/generator-table.module';
import { TabViewModule } from 'primeng/tabview';
import {EditorModule} from "primeng/editor";
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [GeneratorFormComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        UploaderModule,
        FileUploadModule,
        TranslateModule,
        GeneratorTableModule,
        TabViewModule,
        EditorModule,
        CheckboxModule
    ],
  exports: [GeneratorFormComponent],
})
export class GeneratorFormModule {}
