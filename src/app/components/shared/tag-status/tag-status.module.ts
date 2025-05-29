import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TagStatusComponent } from './tag-status.component';


@NgModule({
    declarations: [TagStatusComponent],
    imports: [
        CommonModule,
        TagModule

    ],
    exports: [TagStatusComponent],
})
export class TagStatusModule {
}
