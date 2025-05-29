//.concat('/demo')
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product.model';
import {Brand} from 'src/app/models/brand.model';
import {BrandService} from 'src/app/services/brand.service';
import {Category} from 'src/app/models/category.model';
import {CategoryService} from 'src/app/services/category.service';
import {ProductType} from 'src/app/models/product-type.model';
import {ProductTypeService} from 'src/app/services/product-type.service';
import {Review} from 'src/app/models/review.model';
import {ReviewService} from 'src/app/services/review.service';
import {Conditions, findConditionByName, ProductImpl} from 'src/app/models/productImpl.model';
import {ProductService} from 'src/app/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from 'src/app/layout/toast.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from "rxjs";
import {FileService} from "../../../../services/file.service";
import {CategoryImpl} from "../../../../models/categoryImpl.model";
import {BrandImpl} from "../../../../models/brandImpl.model";
import {DataOption} from "../../../shared/generator-form/generator-form.component";

@Component({
    selector: 'app-add-equipment',
    templateUrl: './add-equipments.component.html'
})
export class AddEquipmentComponent implements OnInit {
    formData ?: any = {}
    editMode: boolean = false;
    isUploading: boolean = false;



    constructor(
        private brandService: BrandService,
        private categoryService: CategoryService,
        private productTypeService: ProductTypeService,
        private reviewService: ReviewService,
        private productService: ProductService,
        private messageService: MessageService,
        private fileService: FileService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToastService) {
    }

    computed = (form: any) => {
        let category: Category = new CategoryImpl();
        let brand: Brand = new BrandImpl();
        if(this.editMode) {
            this.categoryService.getCategoryByName(this.formData.category).subscribe(value => {
                category = value
                form.patchValue({
                    category: category.id,
                });
            });
            this.brandService.getBrandByName(this.formData.brand).subscribe(value => {
                brand = value
                form.patchValue({
                    brand: brand.id,
                });
            });
        }

    }
    product: any = {
        id: 0,
        title: '',
        quantity: 0,
        price: 0.0,
        purchasePrice: 0.0,
        description: '',
        brand: new BrandImpl(),
        category: new CategoryImpl(),
        imageUrl: '',
    };



    services: any = [{
        "brands": this.brandService.getAllBrands(),
        "categories": this.categoryService.getAllCategories(),
    }]

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('formData')) {
            this.formData = JSON.parse(this.route.snapshot.paramMap.get('formData') ?? "{}")
            this.editMode = true;
        }
    }
    async addProduct(event: any) {
        if (!event) {
            this.show('Error', 'Please provide all required fields for EquipmentDetail !', 'error');
            return;
        }
        const brand = {id: String,name:''};
        brand.id = event.brand;
        const category = {id: String,name:''};
        category.id = event.category;
        const productType = {id: null,name:'Electronic'}; //Specific app for electronics products (for now)
        const ct: any = {
            id: this.editMode ? event.id : null,
            title: event.title,
            price: event.price,
            purchasePrice: event.purchasePrice,
            quantity: event.quantity,
            description: event.description,
            brand: brand,
            category: category,
            productType: productType,
            sellCount: -1,
            featured: false,
            imageUrl: event.image ? URL.createObjectURL(event.image) : '',
            condition: Conditions.New,
        };

        const imageFile: File = event.image;

        if (this.editMode) {
            this.productService.updateProduct(event.id, ct).subscribe({
                next: (res) => {
                    this.fileService.uploadImage(imageFile, res.imageUrl, "products");
                    this.toast.showSuccess("Product was updated successfully!");
                    this.router.navigate(['/equipments']);
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to update Product. Please try again.");
                }
            });
        } else {
            this.productService.addProduct(ct).subscribe({
                next: (res) => {
                    this.fileService.uploadImage(imageFile, res.imageUrl, "products");
                    this.toast.showSuccess("Product was added successfully!");
                    this.router.navigate(['/equipments']);
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to add Product. Please try again.");
                }
            });
        }

    }

    show(title: string, msg: string, type: string) {
        this.messageService.add({
            severity: type,
            summary: title,
            detail: msg,
        });
    }


    async getReview(id: number): Promise<Review> {
        const review: any = await firstValueFrom(
            this.reviewService.getReviewById(id)
        );
        return review;
    }

    generateRandom() {
        const r = Math.random() * new Date().getMilliseconds();
        return Math.floor(r % 100000);
    }
}

