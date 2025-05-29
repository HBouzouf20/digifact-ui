import {
    Component,
    ElementRef,
    EventEmitter,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
} from '@angular/core';
import {MessageService} from 'primeng/api';

interface Image {
    name: string;
    objectURL: string;
}

@Component({
    selector: 'generator-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.scss'],
    providers: [MessageService],
})
export class UploaderComponent implements OnChanges {
    uploadedFiles: any[] = [];

    @Output()
    fileSelected = new EventEmitter();

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    constructor(private messageService: MessageService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.uploadedFiles = [];
    }

    onUpload(event: any) {
        // for (let file of event.files) {
        //     this.uploadedFiles.push(file);
        // }


        this.fileSelected.emit(event);

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'File uploaded successfully',
        });
    }

    handleFileSelect(event: any) {
        // Store selected files
        this.uploadedFiles = [...event.files];

        // Reset the file input
        setTimeout(() => {
            const fileUpload = document.querySelector('p-fileUpload');
            if (fileUpload) {
                (fileUpload as any).clear();
            }
        }, 0);
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name
                ? (el.nativeElement.style.display = 'flex')
                : null;
        });
    }

    clearFiles() {
        // Clear the uploaded files
        this.uploadedFiles = [];
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name
                ? (el.nativeElement.style.display = 'none')
                : null;
        });
    }

    removeImage(event: Event, file: any) {
        event.stopPropagation();
        this.uploadedFiles = this.uploadedFiles.filter((i) => i !== file);
    }
}
