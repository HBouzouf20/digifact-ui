 //.concat('/demo')
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from 'src/app/models/issue.model';
import {IssueImpl} from 'src/app/models/issueImpl.model';
import {IssueService} from 'src/app/services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastService } from 'src/app/layout/toast.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-add-issue',
    templateUrl: './add-issue.component.html'
})
export class AddIssueComponent implements OnInit {
    formData ? : any = {}
    editMode : boolean = false;
    computed = (form : any) => {}

    constructor(
        private issueService: IssueService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private toast : ToastService) {}

    model: Issue = new IssueImpl();

    services : any = [{

    }]

    ngOnInit(): void {
        if(this.route.snapshot.paramMap.get('formData')) {
            this.formData = JSON.parse(this.route.snapshot.paramMap.get('formData') ?? "{}")
            this.editMode = true;
        }
    }
    async addIssue(event: any) {
        if (!event) {
            this.show('Error', 'Please provide all required fields for EquipmentDetail !', 'error');
            return;
        }

        const ct: any = {
            id: this.editMode ? event.id : null,
            label: event.label,
        };

        if (this.editMode) {
            this.issueService.updateIssue(event.id, ct).subscribe({
                next: (res) => {
                    this.toast.showSuccess("Issue was updated successfully!");
                    this.router.navigate(['/issues']);

                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to update Issue. Please try again.");
                }
            });
        } else {
            this.issueService.addIssue(ct).subscribe({
                next: (res) => {
                    this.toast.showSuccess("Issue was added successfully!");
                    this.router.navigate(['/issues']);

                },
                error: (err) => {
                    console.error(err);
                    this.toast.showError("Failed to add Issue. Please try again.");
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
