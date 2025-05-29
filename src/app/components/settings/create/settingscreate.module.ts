import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SettingsCreateRoutingModule } from './settingscreate-routing.module';
import { SettingsCreateComponent } from './settingscreate.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UploaderModule } from '../../shared/generator-uploader/uploader.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SettingsCreateRoutingModule,
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
	declarations: [SettingsCreateComponent]
})
export class SettingsCreateModule { }
