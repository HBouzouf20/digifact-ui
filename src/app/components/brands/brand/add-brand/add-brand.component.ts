//.concat('/demo')
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Brand} from 'src/app/models/brand.model';
import {BrandImpl} from 'src/app/models/brandImpl.model';
import {BrandService} from 'src/app/services/brand.service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from 'src/app/layout/toast.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from "rxjs";
import {FileService} from "../../../../services/file.service";

@Component({
    selector: 'app-add-brand',
    templateUrl: './add-brand.component.html'
})
export class AddBrandComponent implements OnInit {
    formData ?: any = {}
    editMode: boolean = false;
    computed = (form: any) => {
    }
    isUploading = false;

    constructor(
        private brandService: BrandService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private fileService: FileService,
        private toast: ToastService) {
    }

    model: Brand = new BrandImpl();

    services: any = [{}]

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('formData')) {
            this.formData = JSON.parse(this.route.snapshot.paramMap.get('formData') ?? "{}")
            this.editMode = true;
        }
    }

    async addBrand(event: any) {
        if (!event) {
            this.show('Error', 'Please provide all required fields for EquipmentDetail !', 'error');
            return;
        }

        const ct: any = {
            id: this.editMode ? event.id : this.generateRandom().toString(),
            name: event.name,
            description: event.description,
            email: event.email,
            active: event.active,
            imageUrl: event.image ? URL.createObjectURL(event.image) : '',
        };
        const imageFile: File = event.image;

        if (this.editMode) {
            this.brandService.updateBrand(event.id, ct).subscribe({
                next: (res) => {
                    this.fileService.uploadImage(imageFile, res.imageUrl, "brands");
                    this.toast.showSuccess("Brand was updated successfully!");
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to update Brand. Please try again.");
                }
            });
        } else {
            this.brandService.addBrand(ct).subscribe({
                next: (res) => {
                    this.fileService.uploadImage(imageFile, res.imageUrl, "brands");
                    this.toast.showSuccess("Brand was added successfully!");
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to add Brand. Please try again.");
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
