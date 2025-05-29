import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DropdownService} from './dropdown.service';
import {Observable} from 'rxjs';
import {ValidationHelper} from "../../../utils/ValidationHelper";

export interface DataOption {
    key: string;
    value: string[] | number[];
    name?: string;
}

@Component({
    selector: 'generator-form',
    templateUrl: './generator-form.component.html',
    styleUrls: ['./generator-form.component.scss'],
})
export class GeneratorFormComponent implements OnInit {
    template: string = 'default';
    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
    dataRows: any;

    objectKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    tableModels: any = [];

    @Input()
    formData: any = {};

    images: any[] = [];

    @Input() title = '';
    @Input() customValidators: any = {};
    @Input() model: any = {};
    @Input() isModal: boolean = false;

    @Output() sub = new EventEmitter();

    dynamicForm: FormGroup = this.fb.group({});
    formFields: any = {};

    @Input()
    dataOptions?: DataOption[] = [];

    @Input()
    services: any = [];

    @Input()
    computed?: (fg: any) => void;

    data: any = {};

    constructor(
        private fb: FormBuilder,
        private dropdownService: DropdownService,
    ) {
    }

    ngOnInit() {

        if(this.formData)
        this.formFields = this.generateMetadata(this.model);

        this.loadDropdownData();
        this.dynamicForm = this.createForm(this.formFields);
        if (this.computed) {
            this.computed(this.dynamicForm);
        }
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.images.push(file);
        }
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name
                ? (el.nativeElement.style.display = 'flex')
                : null;
        });
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name
                ? (el.nativeElement.style.display = 'none')
                : null;
        });
    }

    removeImage(file: Image) {
        this.images = this.images.filter((i) => i !== file);
    }

    loadDropdownData() {
        Object.keys(this.formFields).forEach((key) => {
            if (
                this.formFields[key].type === 'dropdown' &&
                this.dataOptions?.length !== 0
            ) {
                let dOption = this.dataOptions?.find((el) => el.key == key);
                if (dOption) {
                    this.formFields[key].options = dOption?.value;
                    return;
                }
            }
            if (this.formFields[key].type === 'dropdown') {
                this.dropdownService.getDropdownData(key).subscribe((data) => {
                    this.formFields[key].options = this.extractOptions(data);
                });
            }
        });
    }

    isEmptyObject(obj: any) {
        if (obj) return Object.entries(obj).length === 0;

        return false;
    }
    showOnChange($event: any) {
    }
    generateMetadata(model: any): any {
        const metadata: any = {};

        const createMetadata = (
            key: string,
            type: string,
            labelSuffix: string = '',
            options: any[] = [],
            isOptional: boolean = false,
            extra: any = {}
        ) => {
            // Append "optional" to the type if the field is optional
            let validatorType = type;
            if (isOptional) {
                validatorType = `optional`;
            }

            return {
                type,
                label: `${this.title}.${key}${labelSuffix}`,
                options,
                validators: this.getValidatorsForField(key, validatorType),
                ...extra,
            };
        };

        const processField = (key: string, value: any) => {
            const isOptional = ValidationHelper.isOptionalField(model, key);

            if (key === 'id') {
                metadata[key] = createMetadata(key, 'hidden', '', [], false, { validators: [] });
                return;
            }

            if (typeof value === 'object' && value !== null) {
                if (!Array.isArray(value) && Object.values(value).every((v) => typeof v === 'string')) {
                    metadata[key] = createMetadata(
                        key,
                        'dropdown',
                        '',
                        Object.values(value).map((v) => ({ value: v, label: v })),
                        isOptional
                    );
                } else if (Array.isArray(value)) {
                    const service = this.services.find((service: any) => service[key]);
                    if (service) {
                        metadata[key] = {
                            type: 'table',
                            label: `${this.title}.${key}`,
                            name: key,
                        };
                        this.tableModels.push({
                            [key]: {
                                skeleton: [value[0]],
                                dataRows: service[key] as Observable<any[]>,
                            },
                        });
                    }
                } else {
                    metadata[key] = createMetadata(key, 'dropdown', '', [], isOptional);
                }
            } else if (typeof value === 'number') {
                metadata[key] = createMetadata(key, 'number', '', [], isOptional);
            } else if (value instanceof Date || key.toLowerCase().includes('date')) {
                metadata[key] = createMetadata(key, 'date', '', [], isOptional);
            } else if (key.toLowerCase().includes('phone')) {
                metadata[key] = createMetadata(key, 'phone', '', [], isOptional);
            } else if (key.toLowerCase().includes('path') || key.toLowerCase().includes('image')) {
                metadata[key] = createMetadata(
                    key,
                    'file',
                    ` Upload ${(model.constructor.name ?? '')} image`,
                    [],
                    isOptional
                );
            } else if (typeof value === 'string') {
                metadata[key] = createMetadata(key, 'text', '', [], isOptional);
            } else if (typeof value === 'boolean') {
                metadata[key] = createMetadata(key, 'boolean', '', [], isOptional);
            }
        };

        for (const key in model) {
            if (model.hasOwnProperty(key)) {
                processField(key, model[key]);
            }
        }


        return metadata;
    }

    getEnumOptions(enumType: any): { value: string; label: string }[] {
        return Object.keys(enumType).map((key) => ({
            value: enumType[key],
            label: this.capitalizeFirstLetter(key),
        }));
    }

    isEnum(value: any): boolean {
        // Check if the value is an instance of an enum by checking if it's an object and not an array
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }

    getModelArrayMapping(model: any[]) {
        const keysObject = model.reduce(
            (acc, client) => {
                Object.keys(client).forEach((key) => {
                    acc[key] = (item: any) => item[key];
                });
                return acc;
            },
            {} as Record<string, boolean>,
        );

        return keysObject;
    }

    capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    extractOptions(data: any): any[] {
        const firstItem = data[0];
        const keys = Object.keys(firstItem);
        if (data.length === 0) return [];

        const id = keys[0];
        const valueProperty = keys[1];
        const labelProperty = keys[2];
        return data.map((item: { [x: string]: any }) => ({
            id: item[id],
            value: item[valueProperty],
            label: item[labelProperty],
        }));
    }

    selectItems(selection: any, context: string) {
        this.dynamicForm.patchValue({
            [context]: selection,
        });
    }

    createForm(metadata: any): FormGroup {
        const formControls: any = {};
        for (const key in metadata) {
            const validators =
                metadata[key].validators ||
                this.getDefaultValidationRulesForType(metadata[key].type);
            if (metadata.hasOwnProperty(key)) {
                if (metadata[key].type == 'dropdown') {
                    //get dropdown value
                    let option = null;
                    if (this.formData && this.formData[key]) {
                        if (!this.isEnumDropDown(this.formData[key])) {
                            option = metadata[key].options.find(
                                (option: any) => option.label == this.formData[key],
                            );
                        } else {
                            option = metadata[key].options.find(
                                (option: any) => option == this.formData[key],
                            );
                        }
                    }
                    formControls[key] = [option ?? '', validators];
                } else if (key.toLocaleLowerCase().includes('date')) {
                    let value;
                    if (this.formData && this.formData[key]) {
                        value = this.createDateFromString(this.formData[key]);
                    }
                    formControls[key] = [value ?? '', validators];
                } else {
                    let value;
                    if (this.formData && this.formData[key]) {
                        value = this.formData[key];
                    }
                    formControls[key] = [value ?? '', validators];
                }
            }
        }
        return this.fb.group(formControls);
    }

    createDateFromString(dateString: string) {
        let parts = dateString.split('-');
        const day = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[0], 10);

        return new Date(year, month, day);
    }

    onSubmit() {
        if (this.dynamicForm.valid) {
            this.dynamicForm.value.image = this.images[0];
            this.sub.emit(this.dynamicForm.value);
        } else {

            this.dynamicForm.markAllAsTouched();

        }
    }

    onFileChange(event: any, key: string) {
        this.images.push(...event.currentFiles);
    }

    getValidatorsForField(fieldName: string, fieldType: string): any[] {
        if (this.customValidators && this.customValidators[fieldName]) {
            return this.customValidators[fieldName];
        }
        return this.getDefaultValidationRulesForType(fieldType, fieldName);
    }

    getDefaultValidationRulesForType(type: string, fieldName?: string): any[] {
        switch (type) {
            case 'optional':
                return [
                    Validators.maxLength(200),
                ];
            case 'text':
                if (fieldName === 'description') {
                    return [Validators.required]; // No length constraints for description
                }
                return [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(200),
                ];
            case 'number':
                return [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(100000000),
                ];
            case 'date':
                return [Validators.required];
            case 'phone':
                return [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(13),
                ];
            case 'file':
                return [] // No specific validation for filereturn [Validators.nullValidator]
            case 'dropdown':
                return [Validators.required];
            default:
                return [];
        }
    }

    hasError(controlName: string, errorType: string): boolean {
        const control = this.dynamicForm.get(controlName);
        return (control?.hasError(errorType) && control?.touched)!!;
    }

    isEnumDropDown(dOptions: any) {
        return dOptions.length > 1
            ? typeof dOptions[0] === 'string' || typeof dOptions[0] === 'number'
            : false;
    }
}

interface Image {
    name: string;
    objectURL: string;
}

interface FormEvent {
    eventName: string;
    event: any;
}
