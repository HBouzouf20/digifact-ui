//.concat('/demo')
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { forkJoin, take, tap } from 'rxjs';
import { MappingConfig } from 'src/app/models/mapping.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Product } from '../../../api/product';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ToastService } from 'src/app/layout/toast.service';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from 'src/app/models/user.model';
import { PermissionActions } from 'src/app/permisson.action';
import { AuthService } from 'src/app/services/auth.service';
import { hasPermission } from '../../authentication/permissions';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit, OnChanges,PermissionActions {
    products!: any[];
    order : any;
    orderTypes = [
        { item: 'All', value: 'all' },
        { item: 'Repair', value: 'repair' },
        { item: 'Order', value: 'order' },
    ];
    row : any;
    deleteItemDialog = false;
    loading: boolean = false;
    labelAdd = 'Add Order';
    orders: any = [];
    saleOrder: any = [];
    repairOrder: any = [];
    user : User | null = null;
    expandedRows = {};
    globalFilters: string[] = [
        'Client',
        'Reference',
        'Date',
        'Total',
        'Status',
    ];

    paymentStatus: any = [
        { state: 'Payed', value: 'PAYED' },
        { state: 'Not payed', value: 'NOT_PAYED' },
    ];

    payStatus : any;
    showEditStatus = false;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private toast: ToastService,
        private invoice: InvoiceService
        , private auth : AuthService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {}

    exportCSV(dt: any) {
        dt.exportCSV();
    }
    download(order: any) {
        let x = this.invoice.generateFromOrder(order);
    }

    confirmDelete() {
        this.orderService.deleteOrder(this.row.id).subscribe({
            next: (res) => {
                let deletedItemIndex = this.orders.findIndex((e: any) => e.id == this.row.id);
                if (deletedItemIndex !== -1) {
                    let item = this.orders.splice(deletedItemIndex, 1);
                    this.orders = this.orders.filter((e: any) => e.id !== item[0].id)

                }

            },
            error: (err) => {
                console.error('Error deleting order:', err);
            }
        });
        this.deleteItemDialog = false;
    }

    deleteItem(event: any) {
        this.row = event;
        this.deleteItemDialog = true;
    }

    editItem(event: any) {
        let order = this.orders.find((d: any) => d.id === event.id);
        this.router.navigate(['/orders/edit'], {
            state: { formData: JSON.stringify(order) },
        });
    }

    isRepair(repair: any) {
        return this.repairOrder.includes(repair);
    }

    updateDt(event: any) {
        switch (event.value) {
            case 'all':
                this.orders = [...this.saleOrder, ...this.repairOrder];
                break;
            case 'repair':
                this.orders = [...this.repairOrder];
                break;
            case 'order':
                this.orders = [...this.saleOrder];
                break;
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    editStatus(event : any) {
        this.order = this.orders.find((d: any) =>
            d.id === event.id
          )

        this.payStatus = this.paymentStatus.find((p:any) => p.state === this.order.paymentStatus)

        this.showEditStatus = true;

    }

    saveStatus() {
        this.order.paymentStatus = this.payStatus.state;

        this.orderService.updateOrderStatus(this.order.id, this.order.paymentStatus).subscribe({
         next: (res: any) => {
             this.toast.showSuccess('Order was updated successfully!');
             this.showEditStatus = false;
             const index = this.orders.findIndex((row : any) => row.id === this.order.id);
                 if (index !== -1) {
                     const dt = this.orders;
                     dt[index] = this.order;
                     this.orders = [...dt];
                 }

         },
         error: (err: any) => {
             this.toast.showError(
                 'Failed to update Order. Please try again.'
             );
         },
     })


     }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(
                Object.keys(this.orders)
            );
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'data');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    exportPdf() {
        var doc = new jsPDF();
        // autoTable(doc, {
        //     head: [this.alwaysDisplay.map((col) => col.header)],
        //     body: this.rows.map((row: { [x: string]: any }) =>
        //     this.alwaysDisplay.map((col) => row[col.field]),
        //     ),
        //     didDrawCell: (data) => {},
        // });
        doc.save('table.pdf');
    }

    add() {
        this.router.navigate(['/orders/add']);
    }

    ngOnInit(): void {
        this.user = this.auth.getSignedUser();
        const orders$ = this.orderService.getAllOrders();


    }
    canAddItem() {
        return hasPermission(this.user!!, "create:orders")
    }

    canViewItem() {
      return  hasPermission(this.user!!, "view:orders")
    };

    canDeleteItem () {
        return  hasPermission(this.user!!, "delete:orders")
    };

    canUpdateItem() {
        return  hasPermission(this.user!!, "update:orders")
    } ;

    canEditStatusItem() {
        return hasPermission(this.user!!, 'editStatus:orders')
    }
    expandAll() {
        this.expandedRows = this.orders.reduce(
            (acc: any, order: any) => (acc[order.reference] = true) && acc,
            {}
        );
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getTotal(items: any[]) {
        return items.reduce((acc, item) => {
            return acc + item.totalPrice;
        }, 0);
    }
}
