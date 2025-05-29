import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', data: {breadcrumb: 'Equipments'}, loadChildren: () => import('./equipment/equipment.module').then(m => m.EquipmentModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsRoutingModule { }
