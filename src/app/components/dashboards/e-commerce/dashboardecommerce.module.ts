import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEcommerceRoutingModule } from './dashboardecommerce-routing.module';
import { DashboardEcommerceComponent } from './dashboardecommerce.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {TranslateModule} from "@ngx-translate/core";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";

@NgModule({
    imports: [
        CommonModule,
        DashboardEcommerceRoutingModule,
        ButtonModule,
        RippleModule,
        MenuModule,
        ChartModule,
        TableModule,
        InputTextModule,
        OverlayPanelModule,
        TranslateModule,
        CalendarModule,
        FormsModule,
        FloatLabelModule
    ],
    declarations: [
        DashboardEcommerceComponent
    ]
})
export class DashboardEcommerceModule { }
