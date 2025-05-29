//.concat('/demo')
import {Component, OnInit} from '@angular/core';
import {Table} from 'primeng/table';
import {take, tap} from 'rxjs';
import {MappingConfig} from 'src/app/models/mapping.model';
import {ProductService} from 'src/app/services/product.service';
import {Router} from '@angular/router';
import {environment} from 'src/environment/environment';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
    loading: boolean = false;
    dataRows: any = [];
    showDetail: boolean = false;
    rowDetail: any = {};
    private publicHost = environment.publicHost;

    constructor(private productService: ProductService, private router: Router) {
    }


    // Updated productMapping with Product properties
    productMapping: MappingConfig = {
        id: (item) => item.id,
        sku: item => item.sku,
        imageUrl: item => this.publicHost.concat("/images/").concat(item.imageUrl),
        title: item => item.title,
        slug: item => item.slug,
        price: item => item.price,
        purchasePrice: item => item.purchasePrice ? item.purchasePrice : '0',
        discount: item => item.discount,
        quantity: item => item.quantity,
        description: item => item.description,
        featured: item => item.featured ?? 'false',
        sellCount: item => item.sellCount,
        condition: item => item.condition,
        status: item => item.status,
        brand: item => item.brand?.name ?? '',
        category: item => item.category?.name ?? '',
        //reviews: item => item.reviews,
    };

    ngOnInit(): void {
        this.productService.getAllProducts().pipe(
            take(1),
            tap(products => {
                this.dataRows = products;
            })
        ).subscribe();
    }

    onEvent(event: any, data?: boolean) {
        //handle Events
        if (event == "Add") {
            this.router.navigate(["/products/add"])
        } else if (event.eventType && event.eventType === "edit") {
            delete event.eventType;
            console.log(event);

            this.router.navigate(['/products/edit', {formData: JSON.stringify(event)}])

        } else if (event.eventType && event.eventType === "delete") {
            delete event.eventType;
            this.delete(event);

        } else if (event.eventType && event.eventType === "show") {
            delete event.eventType;
            this.showDetail = true;
            this.rowDetail = event;

        }
    }

    delete(event: any) {

        this.productService.deleteProduct(event.id).subscribe({
            next: (res) => {
                let deletedItemIndex = this.dataRows.findIndex((e: any) => e.id == event.id);
                if (deletedItemIndex !== -1) {
                    let item = this.dataRows.splice(deletedItemIndex, 1);
                    this.dataRows = this.dataRows.filter((e: any) => e.id !== item[0].id)

                }

            },
            error: (err) => {
                console.error('Error adding product:', err);
            }
        });
    }
}
