 //.concat('/demo')
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { take, tap } from 'rxjs';
import { MappingConfig } from 'src/app/models/mapping.model';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
 import {environment} from "../../../../environment/environment";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
    loading: boolean = false;
    dataRows: any = [];
    showDetail: boolean = false;
    rowDetail: any = {};
    private publicHost = environment.publicHost;

    constructor(private categoryService: CategoryService,private router: Router) {}


    // Updated categoryMapping with Category properties
    categoryMapping: MappingConfig = {
        id : (item) => item.id,
            name: item => item.name,
            status: item => item.status,
            imageUrl: item => this.publicHost.concat("/images/").concat(item.imageUrl),
    };

    ngOnInit(): void {
        this.categoryService.getAllCategories().pipe(
            take(1),
            tap(categories => {
                this.dataRows = categories;
            })
        ).subscribe();
    }

    onEvent(event: any, data?: boolean) {
        //handle Events
        if (event == "Add") {
          this.router.navigate(["/categories/add"])
        } else if (event.eventType && event.eventType === "edit") {
          delete event.eventType;
          console.log(event);

          this.router.navigate(['/categories/edit',{formData: JSON.stringify(event)}])

        } else if (event.eventType && event.eventType === "delete") {
          delete event.eventType;
          this.delete(event);

        } else if(event.eventType && event.eventType === "show") {
          delete event.eventType;
          this.showDetail = true;
          this.rowDetail = event;

        }
    }

    delete(event: any) {

        this.categoryService.deleteCategory(event.id).subscribe({
            next: (res) => {
                let deletedItemIndex = this.dataRows.findIndex((e: any) => e.id == event.id);
                if (deletedItemIndex !== -1) {
                    let item = this.dataRows.splice(deletedItemIndex, 1);
                    this.dataRows = this.dataRows.filter((e: any) => e.id !== item[0].id)

                }

            },
            error: (err) => {
                console.error('Error adding category:', err);
            }
        });
    }
}
