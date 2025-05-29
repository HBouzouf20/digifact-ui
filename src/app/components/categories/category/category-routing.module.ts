import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from "./category.component";
import {AddCategoryComponent} from "./add-category/add-category.component";

const routes: Routes = [
  { path: '', component: CategoryComponent},
  { path: 'add', data: {breadcrumb: 'category.add'}, component: AddCategoryComponent},
  {path : 'edit', data: {breadcrumb: 'category.edit'}, component: AddCategoryComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
