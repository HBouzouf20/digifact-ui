import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product.component";
import {AddProductComponent} from "./add-product/add-product.component";

const routes: Routes = [
  { path: '', component: ProductComponent},
  { path: 'add', data: {breadcrumb: 'product.add'}, component: AddProductComponent},
  {path : 'edit', data: {breadcrumb: 'product.edit'}, component: AddProductComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
