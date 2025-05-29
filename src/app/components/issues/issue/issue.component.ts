 //.concat('/demo')
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { take, tap } from 'rxjs';
import { MappingConfig } from 'src/app/models/mapping.model';
import { IssueService } from 'src/app/services/issue.service';
import { Router } from '@angular/router';
import { PermissionActions } from 'src/app/permisson.action';
import { hasPermission } from '../../authentication/permissions';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
})
export class IssueComponent implements OnInit, PermissionActions {
    loading: boolean = false;
    dataRows: any = [];
    showDetail: boolean = false;
    rowDetail: any = {};
    user : User | null = null;
    constructor(private issueService: IssueService,private router: Router, private auth : AuthService) {}


    // Updated issueMapping with Issue properties
    issueMapping: MappingConfig = {
        id : (item) => item.id,
            label: item => item.label,
    };

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

    ngOnInit(): void {
        this.user = this.auth.getSignedUser();
        this.issueService.getAllIssues().pipe(
            take(1),
            tap(issues => {
                this.dataRows = issues;
            })
        ).subscribe();
    }

    onEvent(event: any, data?: boolean) {
        //handle Events
        if (event == "Add") {
          this.router.navigate(["/issues/add"])
        } else if (event.eventType && event.eventType === "edit") {
          delete event.eventType;

          this.router.navigate(['/issues/edit',{formData: JSON.stringify(event)}])

        } else if (event.eventType && event.eventType === "delete") {
          delete event.eventType;
          this.delete(event);

        } else if(event.eventType && event.eventType === "show") {
          delete event.eventType;
          this.showDetail = true;
          this.rowDetail = event;

        }
    }

    delete(event: any) {

        this.issueService.deleteIssue(event.id).subscribe({
            next: (res) => {
                let deletedItemIndex = this.dataRows.findIndex((e: any) => e.id == event.id);
                if (deletedItemIndex !== -1) {
                    let item = this.dataRows.splice(deletedItemIndex, 1);
                    this.dataRows = this.dataRows.filter((e: any) => e.id !== item[0].id)

                }

            },
            error: (err) => {
                console.error('Error adding issue:', err);
            }
        });
    }
}
