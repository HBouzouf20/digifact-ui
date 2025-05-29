import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEquipmentComponent} from "./add-equipments/add-equipments.component";
import { EquipmentComponent } from './equipment.component';

const routes: Routes = [
  { path: '', component: EquipmentComponent},
  { path: 'add', data: {breadcrumb: 'equipment.add'}, component: AddEquipmentComponent},
  {path : 'edit', data: {breadcrumb: 'equipment.edit'}, component: AddEquipmentComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
