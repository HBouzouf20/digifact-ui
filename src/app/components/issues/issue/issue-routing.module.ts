import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IssueComponent} from "./issue.component";
import {AddIssueComponent} from "./add-issue/add-issue.component";

const routes: Routes = [
  { path: '', component: IssueComponent},
  { path: 'add', data: {breadcrumb: 'issue.add'}, component: AddIssueComponent},
  {path : 'edit', data: {breadcrumb: 'issue.edit'}, component: AddIssueComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IssueRoutingModule { }
