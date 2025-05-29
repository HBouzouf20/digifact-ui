import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsCreateComponent } from './settingscreate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SettingsCreateComponent }
	])],
	exports: [RouterModule]
})
export class SettingsCreateRoutingModule { }
