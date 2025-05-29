import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {Table, TableLazyLoadEvent} from 'primeng/table';
import {MappingConfig} from 'src/app/models/mapping.model';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable';
import {jsPDF} from 'jspdf';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environment/environment';
import {LazyLoadEvent} from "primeng/api";

@Component({
    selector: 'generator-table',
    templateUrl: './generator-table.component.html',
    styleUrls: ['./generator-table.component.scss'],
})
export class GeneratorTableComponent implements OnInit, OnChanges {
    public constructor(private translator: TranslateService) {
    }

    displayedColumns: any = [];

    deleteItemDialog = false;

    row: any = null;
    selectedRows: any = [];
    template = 'default';

    @Input()
    haveDetails: boolean = true;

    @Output()
    onSelect = new EventEmitter();

    @Input()
    id = 'id';

    @Input()
    paginate = true;

    @Input()
    rowsPerPage = 5;

    first = 0;
    exportColumns: any[] = [];
    @Input()
    dataRows: any;

    @Input()
    mapping?: any = {};

/*    @Input()
    globalFilterFields?: any[] = [];*/

    @Input()
    name: string = ''; //Liste des éléments

    @Input()
    tableElements?: any; //Liste des éléments

    @Output()
    event = new EventEmitter();

    @Output()
    change = new EventEmitter();

    @Input()
    addable = false;

    @Input()
    canAddItem = true;

    @Input()
    editable = true;

    @Input()
    exportable = true;

    @Input()
    deletable = true;

    @Input()
    hasHeader = true;

    @Input()
    status = false;

    cols: Col[] = [];
    rows: any = [];

    _selectedColumns: Col[] = [];

    alwaysDisplay: Col[] = [];
    @Input()
    globalFilters: string[] = [];

    @ViewChild('filter') filter!: ElementRef;

    loading: boolean = false;

    virtualCars!: any[];

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    add() {
        this.event.emit('Add');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    save(table: Table) {
        table.exportCSV();
        this.filter.nativeElement.value = '';
    }

    get selectedColumns(): Col[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: Col[]) {
        //restore original order

        this._selectedColumns = this.cols.filter((col) => val.includes(col));
    }

    title = '';
    labelAdd = '';

    ngOnInit(): void {
        this.title = this.name + '.list';
        this.labelAdd = this.name + '.add';
        this.virtualCars = Array.from({length: 10000});

    }

    handleCols(data: any, mapping: MappingConfig) {
        const cols = new Set<Col>();

        if (mapping) {
            return Object.keys(mapping)
                .filter((element) => element != 'id')
                .map((key) => {
                    let tKey = '';
                    this.translator.get(this.name + '.' + key).subscribe((value) => {
                        tKey = value;
                    });
                    this.globalFilters.push(key);

                    return {
                        field: key,
                        header: tKey,
                    };
                });
        } else if (data[0]) {
            const firstItem = data[0];

            // Add top-level keys
            Object.keys(firstItem).forEach((key) => {
                if (key != 'id') {
                    this.translator.get(this.name + '.' + key).subscribe((tKey) => {
                        cols.add({
                            field: key,
                            header: tKey,
                        });
                    });
                }
            });
        }
        this._selectedColumns = Array.from(cols);

        return Array.from(cols);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dataRows']) {
            this.updateTable();
        }
        this.displayedColumns = [...this.alwaysDisplay, ...this.selectedColumns];
    }

    getCols() {
        return this.cols.filter((key, index) => index != 0);
    }

    updateTable() {
        if (this.cols.length == 0) {
            this.cols =
                this.cols.length == 0
                    ? this.handleCols(this.dataRows, this.mapping)
                    : this.cols;
            this.alwaysDisplay = this.cols.slice(0, 2);
            this.cols.splice(0, 2);
        }

        this.rows = this.handleRows(this.dataRows, this.mapping);
        this._selectedColumns = this.cols;
    }

    selectRow(item: any) {
        this.onSelect.emit(this.selectedRows);
    }

    handleRows<T>(data: T[], mapping?: MappingConfig) {
        if (!data) return;

        if (!mapping || Object.keys(mapping).length === 0) {
            // Return data as-is if no mapping configuration is provided
            return data;
        }

        return data.map((item) => {
            const result: any = {};
            for (const [key, transformFn] of Object.entries(mapping)) {
                if (typeof transformFn === 'function') {
                    result[key] = (transformFn as (value: T) => any)(item);
                }
            }
            return result;
        });
    }

    next() {
        if (!this.isLastPage()) this.first += this.rowsPerPage;
    }

    prev() {
        if (!this.isFirstPage()) this.first -= this.rowsPerPage;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.rows
            ? this.first >= this.rows.length - this.rowsPerPage ||
            this.first + this.rowsPerPage >= this.rows.length
            : true;
    }

    isFirstPage(): boolean {
        return this.rows ? this.first === 0 : true;
    }

    onPageChange(event: any) {
        this.rowsPerPage = event.rows;
        this.first = event.first;
    }

    exportPdf() {
        var doc = new jsPDF();
        autoTable(doc, {
            head: [this.alwaysDisplay.map((col) => col.header)],
            body: this.rows.map((row: { [x: string]: any }) =>
                this.alwaysDisplay.map((col) => row[col.field]),
            ),
            didDrawCell: (data) => {
            },
        });
        doc.save('table.pdf');
    }

    exportCSV(dt: any) {
        dt.exportCSV();
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.rows);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
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
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION,
        );
    }

    saveItem(event: any) {
        this.event.emit({...event, eventType: 'edit'});
    }

    deleteItem(event: any) {

        this.deleteItemDialog = true;
        this.row = {...event};
    }

    editStatus(event: any) {
        this.event.emit({...event, eventType: 'editStatus'});
    }

    editItem(event: any) {
        this.event.emit({...event, eventType: 'edit'});
    }

    addItem(event: any) {
        this.event.emit({...event, eventType: 'add'});
    }

    showDetail(event: any) {
        this.event.emit({...event, eventType: 'show'});
    }

    showItem(event: any) {
        this.event.emit({...event, eventType: 'show'});
    }

    isImage(field: any) {
        return field.includes('path') || field.includes('image');
    }

    deleteSelectedProducts() {
    }

    openNew() {
    }

    edit() {
    }

    delete() {
    }

    confirmDelete() {
        this.event.emit({...this.row, eventType: 'delete'});
        this.deleteItemDialog = false;
    }

    loadCarsLazy(event: TableLazyLoadEvent) {
        setTimeout(() => {
            const first = event.first ?? 0;
            const rows = event.rows ?? 10;

            const loadedCars = this.dataRows.slice(first, first + rows);

            this.virtualCars.splice(first, rows, ...loadedCars);

            if (typeof event.forceUpdate === 'function') {
                event.forceUpdate();
            }
        }, Math.random() * 1000 + 250);
    }

}

type Col = {
    field: string;
    header: string;
    exportable?: boolean;
};
