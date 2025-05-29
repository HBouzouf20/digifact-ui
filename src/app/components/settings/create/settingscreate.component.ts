import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsService} from "../../../services/settings.service";
import {ToastService} from "../../../layout/toast.service";
import {FileService} from "../../../services/file.service";

export interface SocialMedia {
    facebook: string;
    youtube: string;
    instagram: string;
    twitter: string;
}

export interface Settings {
    fullname: string;
    title: string;
    logo: string;
    phone: string;
    socialMedia: SocialMedia;
    email: string;
    address: string;
}

@Component({
    templateUrl: './settingscreate.component.html',
})
export class SettingsCreateComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    form: FormGroup;
    isUploading: boolean = false;
    socialMedias: any[] = [];
    logo: File | null = null;

    constructor(
        private service: SettingsService,
        private fileService: FileService,
        private toast: ToastService
    ) {
        this.form = this.formBuilder.group({
            fullname: ['', Validators.required],
            title: ['', Validators.required],
            phone: ['', Validators.required],
            logo: [],
            socialMedia: this.formBuilder.group({
                facebook: [''],
                youtube: [''],
                instagram: [''],
                twitter: [''],
            }),
            email: ['', [Validators.required, Validators.email]],
            address: ['', Validators.required],
        });
    }

    ngOnInit() {
        // Preload settings if they exist
        this.service.getSettings().subscribe({
            next: (res) => {
                this.form.patchValue(res);
            },
            error: (err) => {
                console.error("Failed to load settings:", err);
                this.toast.showError("Unable to load settings. Please try again.");
            },
        });

        this.socialMedias = [
            {name: 'facebook', icon: 'pi pi-facebook'},
            {name: 'youtube', icon: 'pi pi-youtube'},
            {name: 'instagram', icon: 'pi pi-instagram'},
            {name: 'twitter', icon: 'pi pi-twitter'},
        ];
    }

    onFileChange(event: any) {
        if (event.files && event.files.length > 0) {
            this.logo = event.files[0];
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            this.toast.showError("Please fill all required fields correctly.");
            return;
        }

        const formData = this.form.value;
        const settings: Settings = {
            fullname: formData.fullname,
            title: formData.title,
            logo: this.logo ? URL.createObjectURL(this.logo) : '',
            phone: formData.phone,
            socialMedia: {
                facebook: formData.socialMedia.facebook,
                youtube: formData.socialMedia.youtube,
                instagram: formData.socialMedia.instagram,
                twitter: formData.socialMedia.twitter,
            },
            email: formData.email,
            address: formData.address,
        };
        this.service.addOrUpdateSettings(settings).subscribe({
            next: (res) => {
                this.fileService.uploadImage(this.logo, res.logo, "logos", this.isUploading);
                this.toast.showSuccess("Settings were added successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            error: (err) => {
                console.error("Failed to save settings:", err);
                this.toast.showError("Failed to add settings. Please try again.");
            },
        });
    }

    private extractFilename(url: string): string {
        const parts = url.split('/');
        return parts[parts.length - 1] || '';
    }
}
