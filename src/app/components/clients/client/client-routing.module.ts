import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./client.component";
import {AddClientComponent} from "./add-client/add-client.component";

const routes: Routes = [
  { path: '', component: ClientComponent},
  { path: 'add', data: {breadcrumb: 'client.add'}, component: AddClientComponent},
  {path : 'edit', data: {breadcrumb: 'client.edit'}, component: AddClientComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
