import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import {hasPermission} from '../components/authentication/permissions';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    signedUser: User | null = null;

    constructor(private translateService: TranslateService, private auth: AuthService) {
    }

    ngOnInit() {
        this.signedUser = this.auth.getSignedUser();

        this.model = [
            {
                label: this.translateService.instant('dashboard'),
                icon: 'pi pi-fw pi-home',
                items: [
                    {
                        label: this.translateService.instant('home'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    }
                ]
            },
            (hasPermission(this.signedUser!!, "view:equipments") || hasPermission(this.signedUser!!, "view:brands") || hasPermission(this.signedUser!!, "view:categories")) && {
                label: this.translateService.instant('equipments'),
                icon: 'pi pi-th-large',
                items: [
                    hasPermission(this.signedUser!!, "view:equipments") && {
                        label: this.translateService.instant('equipments'),
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            {
                                label: this.translateService.instant('equipments.list'),
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/equipments']
                            },
                            hasPermission(this.signedUser!!, "create:equipments") && {
                                label: this.translateService.instant('equipments.add'),
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/equipments/add']
                            },
                        ]
                    },
                    hasPermission(this.signedUser!!, "view:brands") && {
                        label: this.translateService.instant('brands'),
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: this.translateService.instant('brand.list'),
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/brands']
                            },
                            hasPermission(this.signedUser!!, "create:brands") && {
                                label: this.translateService.instant('brand.add'),
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/brands/add']
                            },
                        ]
                    },
                    hasPermission(this.signedUser!!, "view:categories") && {
                        label: this.translateService.instant('categories'),
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            {
                                label: this.translateService.instant('category.list'),
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/categories']
                            },
                            hasPermission(this.signedUser!!, "create:categories") && {
                                label: this.translateService.instant('category.add'),
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/categories/add']
                            },
                        ]
                    }
                ]
            },
            hasPermission(this.signedUser!!, "view:clients") && {
                label: this.translateService.instant('clients'),
                icon: 'pi pi-th-large',
                items: [
                    hasPermission(this.signedUser!!, "view:clients") && {
                        label: this.translateService.instant('clients'),
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: this.translateService.instant('clients.list'),
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/clients']
                            },
                            hasPermission(this.signedUser!!, "create:clients") && {
                                label: this.translateService.instant('clients.add'),
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/clients/add']
                            },
                        ]
                    }
                ]
            },
            hasPermission(this.signedUser!!, "view:orders") && {
                label: this.translateService.instant('invoices'),
                icon: 'pi pi-th-large',
                items: [
                    hasPermission(this.signedUser!!, "view:orders") && {
                        label: this.translateService.instant('invoices'),
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: this.translateService.instant('invoices.list'),
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/orders']
                            },
                            hasPermission(this.signedUser!!, "create:orders") && {
                                label: this.translateService.instant('invoices.add'),
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/orders/add']
                            }
                        ]
                    }
                ]
            },

            hasPermission(this.signedUser!!, "view:issues") && {
                label: this.translateService.instant('issues'),
                icon: 'pi pi-th-large',
                items: [
                    hasPermission(this.signedUser!!, "view:issues") && {
                        label: this.translateService.instant('issues'),
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: this.translateService.instant('issue.list'),
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/issues']
                            },
                            hasPermission(this.signedUser!!, "create:issues") && {
                                label: this.translateService.instant('issue.add'),
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/issues/add']
                            },
                        ]
                    }
                ]
            },];
        this.model.forEach((menuItem: any) => {
            if (menuItem.items) {
                menuItem.items = menuItem.items.filter((item: any) => item !== false);

                menuItem.items.forEach((subItem: any) => {
                    if (subItem.items) {
                        subItem.items = subItem.items.filter((item: any) => item !== false);
                    }
                });
            }

        })
        this.model = this.model.filter(item => item !== false)

    }
}
