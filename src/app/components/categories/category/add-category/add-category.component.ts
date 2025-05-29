 //.concat('/demo')
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from 'src/app/models/category.model';
import {CategoryImpl} from 'src/app/models/categoryImpl.model';
import {CategoryService} from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/layout/toast.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from "rxjs";
 import {FileService} from "../../../../services/file.service";

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit {
    formData ? : any = {}
    editMode : boolean = false;
    computed = (form : any) => {}
    isUploading: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private fileService: FileService,
        private toast : ToastService) {}

    model: Category = new CategoryImpl();

    services : any = [{

    }]

    ngOnInit(): void {
        if(this.route.snapshot.paramMap.get('formData')) {
            this.formData = JSON.parse(this.route.snapshot.paramMap.get('formData') ?? "{}")
            this.editMode = true;
        }
    }
    async addCategory(event: any) {
        if (!event) {
            this.show('Error', 'Please provide all required fields for EquipmentDetail !', 'error');
            return;
        }

        const ct: any = {
            id: this.editMode ? event.id : null,
            name: event.name,
            status: event.status,
            imageUrl: event.image ? URL.createObjectURL(event.image) : '',
        };
        const imageFile: File = event.image;
        // Validate file
        /**if (!(imageFile instanceof File)) {
            console.error('Invalid file type. Please upload a valid file.');
            this.toast.showError('Invalid file. Please upload a valid file.');
            return;
        }**/

        if (this.editMode) {
            this.categoryService.updateCategory(event.id, ct).subscribe({
                next: (res) => {
                    this.fileService.uploadImage(imageFile, res.imageUrl, "categories");
                    this.toast.showSuccess("Category was updated successfully!");
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to update Category. Please try again.");
                }
            });
        } else {
            this.categoryService.addCategory(ct).subscribe({
                next: (res) => {
                    this.fileService.uploadImage(imageFile, res.imageUrl, "categories");
                    this.toast.showSuccess("Category was added successfully!");
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to add Category. Please try again.");
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
    generateRandom() {
        const r = Math.random() * new Date().getMilliseconds();
        console.log(r);
        return Math.floor(r % 100000);
    }
}
