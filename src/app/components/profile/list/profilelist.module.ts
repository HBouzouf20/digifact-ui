import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProfileListComponent } from './profilelist.component';
import { ProfileListRoutingModule } from './profilelist-routing.module';
import { TagStatusModule } from '../../shared/tag-status/tag-status.module';

@NgModule({
	imports: [
		CommonModule,
		ProfileListRoutingModule,
		RippleModule,
		ButtonModule,
		InputTextModule,
		TableModule,
		ProgressBarModule,
        TagStatusModule
	],
	declarations: [ProfileListComponent]
})
export class ProfileListModule { }