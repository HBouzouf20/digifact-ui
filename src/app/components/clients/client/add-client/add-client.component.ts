//.concat('/demo')
import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Client} from 'src/app/models/client.model';
import {ClientImpl} from 'src/app/models/clientImpl.model';
import {ClientService} from 'src/app/services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from 'src/app/layout/toast.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from "rxjs";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html'
})
export class AddClientComponent implements OnInit {
    @Input()
    isModal = false;

    unkownClient = false;
    modelPassager = {id: 0, fullname: '', phone: ''};

    @Output()
    onAdd = new EventEmitter();

    clientType = [{state: 'Known'}, {state: 'Unknown'}]

    config = inject(DynamicDialogConfig);

    changeClient(event: any) {
        this.unkownClient = event.checked;
    }

    formData ?: any = {}
    editMode: boolean = false;
    computed = (form: any) => {
    }

    constructor(
        private clientService: ClientService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToastService) {
    }

    model: Client = new ClientImpl();

    services: any = [{}]

    ngOnInit(): void {
        if (this.config.data && this.config.data.isModal) {
            this.isModal = this.config.data.isModal
        }
        if (this.route.snapshot.paramMap.get('formData')) {
            this.formData = JSON.parse(this.route.snapshot.paramMap.get('formData') ?? "{}")
            this.editMode = true;
        }
        if (this.config.data && this.config.data.onAdd) {
            this.onAdd = this.config.data.onAdd
        }
    }

    async addClient(event: any) {
        if (!event) {
            this.show('Error', 'Please provide all required fields for Client !', 'error');
            return;
        }

        const ct: any = {
            id: this.editMode ? event.id : null,
            fullname: event.fullname,
            phone: event.phone,
            email: event.email ?? '',
            address: event.address ?? '',
            type: this.unkownClient ? this.clientType[1].state : this.clientType[0].state
        };



        if (this.editMode) {
            this.clientService.updateClient(event.id, ct).subscribe({
                next: (res) => {
                    this.toast.showSuccess("Client was updated successfully!");
                    this.router.navigate(['/clients']);

                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError(`Failed to update Client. ${err.error}`);
                }
            });
        } else {
            this.clientService.addClient(ct).subscribe({
                next: (res : any) => {
                    this.onAdd.emit(res);
                    this.toast.showSuccess("Client was added successfully!");
                    this.router.navigate(['/clients']);

                },
                error: (err) => {
                    console.error(err.error);
                    this.toast.showError(`Failed to add Client. ${err.error.message}`);
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
        return Math.floor(r % 100000);
    }
}
