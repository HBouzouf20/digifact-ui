import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
