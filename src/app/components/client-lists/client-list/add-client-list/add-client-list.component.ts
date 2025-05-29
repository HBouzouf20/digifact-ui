 //.concat('/demo')
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientList} from 'src/app/models/client-list.model';
import {Client} from 'src/app/models/client.model';
import {ClientService} from 'src/app/services/client.service';
import {ClientListImpl} from 'src/app/models/client-listImpl.model';
import {ClientListService} from 'src/app/services/client-list.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/layout/toast.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-add-client-list',
    templateUrl: './add-client-list.component.html'
})
export class AddClientListComponent implements OnInit {
    formData ? : any = {}
    editMode : boolean = false;
    computed = (form : any) => {}

    constructor(
            private clientService: ClientService,
        private clientListService: ClientListService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private toast : ToastService) {}

    model: ClientList = new ClientListImpl();

    services : any = [{
            "clients" : this.clientService.getAllClients(),

    }]

    ngOnInit(): void {
        if(this.route.snapshot.paramMap.get('formData')) {
            this.formData = JSON.parse(this.route.snapshot.paramMap.get('formData') ?? "{}")
            this.editMode = true;
        }
    }
    async addClientList(event: any) {
        if (!event) {
            this.show('Error', 'Please provide all required fields for EquipmentDetail !', 'error');
            return;
        }

        const client = {id:String};
        client.id = event.client;
        const ct: any = {
            id: this.editMode ? event.id : this.generateRandom().toString(),
            listName: event.listName,
            clients: event.clients,
            description: event.description,
        };

        if (this.editMode) {
            this.clientListService.updateClientList(event.id, ct).subscribe({
                next: (res) => {
                    this.toast.showSuccess("ClientList was updated successfully!");
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to update ClientList. Please try again.");
                }
            });
        } else {
            this.clientListService.addClientList(ct).subscribe({
                next: (res) => {
                    this.toast.showSuccess("ClientList was added successfully!");
                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to add ClientList. Please try again.");
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
        async getClient(id: number): Promise<Client> {
            const client: any = await firstValueFrom(
                this.clientService.getClientById(id)
            );
            return client;
        }
    generateRandom() {
        const r = Math.random() * new Date().getMilliseconds();
        return Math.floor(r % 100000);
    }
}
