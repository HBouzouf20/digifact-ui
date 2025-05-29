//.concat('/demo')
import {Component, OnInit} from '@angular/core';
import {Table} from 'primeng/table';
import {take, tap} from 'rxjs';
import {MappingConfig} from 'src/app/models/mapping.model';
import {ProductService} from 'src/app/services/product.service';
import {Router} from '@angular/router';
import {environment} from 'src/environment/environment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { hasPermission } from '../../authentication/permissions';
import { PermissionActions } from 'src/app/permisson.action';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category.model";
import {CategoryImpl} from "../../../models/categoryImpl.model";
import {EquipmentsModule} from "../equipments.module";
import {Product} from "../../../models/product.model";
import {BrandService} from "../../../services/brand.service";

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
})
export class EquipmentComponent implements OnInit,PermissionActions {
    loading: boolean = false;
    dataRows: any = [];
    showDetail: boolean = false;
    rowDetail: any = {};
    private publicHost = environment.publicHost;
    user : User | null = null;
    constructor(private productService: ProductService, private categoryService: CategoryService,private brandService: BrandService, private router: Router, private auth : AuthService
    ) {
    }


    canEditStatusItem?: (() => boolean) | undefined;
    equipments: Product[] = [];
    categories: string[] = [];
    brands: string[] = [];
    categoryModel: Category = new CategoryImpl();

    // Updated productMapping with Product properties
    productMapping: MappingConfig = {
        id: (item) => item.id,
        sku: item => item.sku,
        imageUrl: item => this.publicHost.concat("/images/").concat(item.imageUrl),
        title: item => item.title,
        price: item => item.price,
        quantity: item => item.quantity,
        description: item => item.description,
        status: item => item.status,
        brand: item => item.brand?.name ?? '',
        category: item => item.category?.name ?? '',

    };

    ngOnInit(): void {
        this.user = this.auth.getSignedUser();


        this.productService.getAllProducts().pipe(
            take(1),
            tap(products => {
                this.equipments = products;
            })
        ).subscribe();
        this.categoryService.getAllCategories().pipe(
            take(1),
            tap(categories => {
                this.categories = categories.map(c => c.name);
            })
        ).subscribe();
        this.brandService.getAllBrands().pipe(
            take(1),
            tap(brands => {
                this.brands = brands.map(c => c.name);
            })
        ).subscribe();
    }

    onEvent(event: any, data?: boolean) {
        //handle Events
        if (event == "Add") {
            this.router.navigate(["/equipments/add"])
        } else if (event.eventType && event.eventType === "edit") {
            delete event.eventType;

            this.router.navigate(['/equipments/edit', {formData: JSON.stringify(event)}])

        } else if (event.eventType && event.eventType === "delete") {
            delete event.eventType;
            this.delete(event);

        } else if (event.eventType && event.eventType === "show") {
            delete event.eventType;
            this.showDetail = true;
            this.rowDetail = event;

        }
    }
    editItem(event: any) {
        let equipment = this.equipments.find((d: any) => d.id === event.id);
        console.log(equipment);

        const mappedProduct :any= {
            id: this.productMapping['id'](equipment),
            sku: this.productMapping['sku'](equipment),
            imageUrl: this.productMapping['imageUrl'](equipment),
            title: this.productMapping['title'](equipment),
            price: this.productMapping['price'](equipment),
            quantity: this.productMapping['quantity'](equipment),
            description: this.productMapping['description'](equipment),
            status: this.productMapping['status'](equipment),
            brand: this.productMapping['brand'](equipment),
            category: this.productMapping['category'](equipment),
        };


        this.router.navigate(['/equipments/edit', {formData: JSON.stringify(mappedProduct)}])

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

    canAddItem() {
        return hasPermission(this.user!!, "create:equipments")
    }

    canViewItem() {
      return  hasPermission(this.user!!, "view:equipments")
    };

    canDeleteItem () {
        return  hasPermission(this.user!!, "delete:equipments")
    };

    canUpdateItem() {
        return  hasPermission(this.user!!, "update:equipments")
    } ;

    // @ts-ignore
    getSeverity(status: string) {
        switch (status) {
            case 'out-of-stock':
                return 'danger';

            case 'in-stock':
                return 'info';
            default:
                return 'info';
        }
    }
}
