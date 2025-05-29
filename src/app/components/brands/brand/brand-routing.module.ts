import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandComponent} from "./brand.component";
import {AddBrandComponent} from "./add-brand/add-brand.component";

const routes: Routes = [
  { path: '', component: BrandComponent},
  { path: 'add', data: {breadcrumb: 'brand.add'}, component: AddBrandComponent},
  {path : 'edit', data: {breadcrumb: 'brand.edit'}, component: AddBrandComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandRoutingModule { }
