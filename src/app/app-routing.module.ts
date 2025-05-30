import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { permissionGuard } from './guards/permission.guard';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    useHash: true,
};

const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import(
                        './components/authentication/authentication.module'
                    ).then((m) => m.AuthenticationModule),
            },
        ],
    },
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./components/dashboards/dashboards.module').then(
                        (m) => m.DashboardsModule
                    ),
            },

            {
                path: 'profile',
                data: { breadcrumb: 'User Management', module : 'profile' },
                loadChildren: () =>
                    import('src/app/components/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
                    canActivate: [permissionGuard],
            },

            {
                path: 'equipments',
                data: { module : 'equipments' },
                loadChildren: () =>
                    import(
                        'src/app/components/equipments/equipments.module'
                    ).then((m) => m.EquipmentsModule),
                    canActivate: [permissionGuard],
            },

            {
                path: 'brands',
                data: { module : 'brands' },
                loadChildren: () =>
                    import('src/app/components/brands/brands.module').then(
                        (m) => m.BrandsModule
                    ),
                    canActivate: [permissionGuard],
            },

            {
                path: 'categories',
                data: { module : 'categories' },
                loadChildren: () =>
                    import(
                        'src/app/components/categories/categories.module'
                    ).then((m) => m.CategoriesModule),
                    canActivate: [permissionGuard],
            },

            {
                path: 'clients',
                data: { module : 'clients' },
                loadChildren: () =>
                    import('src/app/components/clients/clients.module').then(
                        (m) => m.ClientsModule
                    ),
                    canActivate: [permissionGuard],
            },
            {
                path: 'orders',
                data: { module : 'orders' },
                loadChildren: () =>
                    import('src/app/components/orders/orders.module').then(
                        (m) => m.OrdersModule
                    ),
                    canActivate: [permissionGuard],
            },
            {
                path: 'invoices',
                data: { module : 'invoice' },
                loadChildren: () =>
                    import('src/app/components/invoice/invoice.module').then(
                        (m) => m.InvoiceModule
                    ),
                canActivate: [permissionGuard],
            },
            {
                path: 'invoices',
                data: { module : 'invoice' },
                loadChildren: () =>
                    import('src/app/components/invoice/invoice.module').then(
                        (m) => m.InvoiceModule
                    ),
                canActivate: [permissionGuard],
            },
            {
                path: 'invoices',
                data: { module : 'invoice' },
                loadChildren: () =>
                    import('src/app/components/invoice/invoice.module').then(
                        (m) => m.InvoiceModule
                    ),
                canActivate: [permissionGuard],
            },

            {
                path: 'issues',
                data: { module : 'issues' },
                loadChildren: () =>
                    import('src/app/components/issues/issues.module').then(
                        (m) => m.IssuesModule
                    ),
                canActivate: [permissionGuard],
            },
        ],
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
