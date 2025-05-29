import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProfileCreateComponent } from './profilecreate.component';
import { ProfileCreateRoutingModule } from './profilecreate-routing.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProfileCreateRoutingModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
        ToggleButtonModule,
        TranslateModule,
        ReactiveFormsModule
	],
	declarations: [ProfileCreateComponent]
})
export class ProfileCreateModule { }
