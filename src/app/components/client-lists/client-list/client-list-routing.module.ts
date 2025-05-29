import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientListComponent} from "./client-list.component";
import {AddClientListComponent} from "./add-client-list/add-client-list.component";

const routes: Routes = [
  { path: '', component: ClientListComponent},
  { path: 'add', data: {breadcrumb: 'clientList.add'}, component: AddClientListComponent},
  {path : 'edit', data: {breadcrumb: 'clientList.edit'}, component: AddClientListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientListRoutingModule { }
