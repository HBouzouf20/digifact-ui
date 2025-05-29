import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {ProgressBarModule} from 'primeng/progressbar';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {RatingModule} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import {GeneratorTableComponent} from './generator-table.component';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {RippleModule} from 'primeng/ripple';
import {TruncatePipe} from './truncate.pipe'; // Import the pipe
import { TagModule } from 'primeng/tag';
import { TagStatusModule } from '../tag-status/tag-status.module';


@NgModule({
    declarations: [GeneratorTableComponent],
    imports: [
        CommonModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        FormsModule,
        FileUploadModule,
        ToolbarModule,
        FileUploadModule,
        TranslateModule,
        RippleModule,
        TruncatePipe,
        TagStatusModule

    ],
    exports: [GeneratorTableComponent],
})
export class GeneratorTableModule {
}
