import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create/settingscreate.module').then(m => m.SettingsCreateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
