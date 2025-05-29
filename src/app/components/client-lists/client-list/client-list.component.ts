 //.concat('/demo')
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { take, tap } from 'rxjs';
import { MappingConfig } from 'src/app/models/mapping.model';
import { ClientListService } from 'src/app/services/client-list.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PermissionActions } from 'src/app/permisson.action';
import { AuthService } from 'src/app/services/auth.service';
import { hasPermission } from '../../authentication/permissions';

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit,PermissionActions {
    loading: boolean = false;
    dataRows: any = [];
    showDetail: boolean = false;
    rowDetail: any = {};
    user : User | null = null;
    constructor(private clientListService: ClientListService,private router: Router, private auth : AuthService) {}


    // Updated clientListMapping with ClientList properties
    clientListMapping: MappingConfig = {
        id : (item) => item.id,
            listName: item => item.listName,
            clients: item => item.clients,
            description: item => item.description,
    };

    ngOnInit(): void {
        this.user = this.auth.getSignedUser();
        this.clientListService.getAllClientLists().pipe(
            take(1),
            tap(clientLists => {
                this.dataRows = clientLists;
            })
        ).subscribe();
    }

    onEvent(event: any, data?: boolean) {
        //handle Events
        if (event == "Add") {
          this.router.navigate(["/client-lists/add"])
        } else if (event.eventType && event.eventType === "edit") {
          delete event.eventType;

          this.router.navigate(['/client-lists/edit',{formData: JSON.stringify(event)}])

        } else if (event.eventType && event.eventType === "delete") {
          delete event.eventType;
          this.delete(event);

        } else if(event.eventType && event.eventType === "show") {
          delete event.eventType;
          this.showDetail = true;
          this.rowDetail = event;

        }
    }
    canAddItem() {
        return hasPermission(this.user!!, "create:clients")
    }

    canViewItem() {
      return  hasPermission(this.user!!, "view:clients")
    };

    canDeleteItem () {
        return  hasPermission(this.user!!, "delete:clients")
    };

    canUpdateItem() {
        return  hasPermission(this.user!!, "update:clients")
    } ;
    delete(event: any) {

        this.clientListService.deleteClientList(event.id).subscribe({
            next: (res) => {
                let deletedItemIndex = this.dataRows.findIndex((e: any) => e.id == event.id);
                if (deletedItemIndex !== -1) {
                    let item = this.dataRows.splice(deletedItemIndex, 1);
                    this.dataRows = this.dataRows.filter((e: any) => e.id !== item[0].id)

                }

            },
            error: (err) => {
                console.error('Error adding clientList:', err);
            }
        });
    }
}
