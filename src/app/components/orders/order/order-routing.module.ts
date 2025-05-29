import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order.component";
import {AddOrderComponent} from "./add-order/add-order.component";

const routes: Routes = [
  { path: '', component: OrderComponent},
  { path: 'add', data: {breadcrumb: 'order.add'}, component: AddOrderComponent},
  {path : 'edit', data: {breadcrumb: 'order.edit'}, component: AddOrderComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
