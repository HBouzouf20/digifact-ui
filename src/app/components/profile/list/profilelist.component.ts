import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/api/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    templateUrl: './profilelist.component.html'
})
export class ProfileListComponent implements OnInit {

    customers: Customer[] = [];
    users : any;

    constructor(private customerService: CustomerService, private router: Router, private authService : AuthService) { }

    ngOnInit() {

     this.authService.getAllUsers().subscribe((users : any) => {
        this.users = users;
     })


    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser(){
        this.router.navigate(['profile/create'])
    }

}
