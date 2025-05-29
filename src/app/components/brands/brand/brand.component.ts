 //.concat('/demo')
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { take, tap } from 'rxjs';
import { MappingConfig } from 'src/app/models/mapping.model';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';
 import {environment} from "../../../../environment/environment";

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
    loading: boolean = false;
    dataRows: any = [];
    showDetail: boolean = false;
    rowDetail: any = {};
    private publicHost = environment.publicHost;

    constructor(private brandService: BrandService,private router: Router) {}


    // Updated brandMapping with Brand properties
    brandMapping: MappingConfig = {
        id : (item) => item.id,
            name: item => item.name,
            description: item => item.description,
            email: item => item.email,
            active: item => item.active,
            image: item => this.publicHost.concat("/images/").concat(item.imageUrl),
    };

    ngOnInit(): void {
        this.brandService.getAllBrands().pipe(
            take(1),
            tap(brands => {
                this.dataRows = brands;
            })
        ).subscribe();
    }

    onEvent(event: any, data?: boolean) {
        //handle Events
        if (event == "Add") {
          this.router.navigate(["/brands/add"])
        } else if (event.eventType && event.eventType === "edit") {
          delete event.eventType;
          console.log(event);

          this.router.navigate(['/brands/edit',{formData: JSON.stringify(event)}])

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

        this.brandService.deleteBrand(event.id).subscribe({
            next: (res) => {
                let deletedItemIndex = this.dataRows.findIndex((e: any) => e.id == event.id);
                if (deletedItemIndex !== -1) {
                    let item = this.dataRows.splice(deletedItemIndex, 1);
                    this.dataRows = this.dataRows.filter((e: any) => e.id !== item[0].id)

                }

            },
            error: (err) => {
                console.error('Error adding brand:', err);
            }
        });
    }
}
