import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UploaderModule } from '../../shared/generator-uploader/uploader.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UserRoutingModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
        ReactiveFormsModule,
        InputGroupAddonModule,
        InputGroupModule,
        UploaderModule
	],
	declarations: [UserComponent]
})
export class UserModule { }
