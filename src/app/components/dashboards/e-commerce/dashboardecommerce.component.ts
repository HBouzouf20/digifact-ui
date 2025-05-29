import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {AppConfig, LayoutService} from 'src/app/layout/service/app.layout.service';
import {Table} from 'primeng/table';

import {TranslateService} from "@ngx-translate/core";
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
import {CategoryService} from "../../../services/category.service";
import {BrandService} from "../../../services/brand.service";
import {Category} from "../../../models/category.model";
import {Brand} from "../../../models/brand.model";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/order.model";
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../models/client.model";
import {OrderItemImpl} from "../../../models/orderItemImpl.model";
import {Repair} from "../../../models/repair.model";

@Component({
    templateUrl: './dashboardecommerce.component.html',
    styleUrls: ['./dashboardecommerce.component.scss'],

})
export class DashboardEcommerceComponent implements OnInit {
    rangeDates: Date[] | undefined;

    products: Product[] = [];
    categories: Category[] = [];
    brands: Brand[]= [];
    orders: Order[]= [];
    repairs: any[]= [];
    clients: Client[]= [];
    visitorChart: any;
    topProducts: OrderItemImpl[] = [];

    visitorChartOptions: any;
    chartData: any;

    chartOptions: any;

    config!: AppConfig

    items!: MenuItem[];

    cols: any[] = [];

    subscription!: Subscription;

    outOfStock : any = [];

    colorClasses: string[] = ['bg-cyan-500', 'bg-orange-500', 'bg-pink-500', 'bg-purple-500', 'bg-blue-500'];

    totalSold: number = 0;
    totalTarget: number = 2500; // Set your target value
    totalPercentage: number = 0;

    @ViewChild('chatcontainer') chatContainerViewChild!: ElementRef;


    constructor(private productService: ProductService,
                public layoutService: LayoutService,
                public translate: TranslateService,
                public categoryService: CategoryService,
                public brandService: BrandService,
                public orderService: OrderService,
                private clientService: ClientService,
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.config = config;
            this.chartInit()
        });
    }

    ngOnInit() {
        this.productService.getAllProducts().subscribe(data => {
            this.products = data
            this.outOfStock = data.filter(d => d.quantity == 0)
        });
        this.categoryService.getAllCategories().subscribe(data => this.categories = data);
        this.brandService.getAllBrands().subscribe(data => this.brands = data);
        this.orderService.getAllOrders().subscribe(data => {
            this.orders = data;
            this.loadTopProducts()
        });



        this.clientService.getAllClients().subscribe(data => this.clients = data);
        this.cols = [
            {header: 'Name', field: 'title'},
            {header: 'Category', field: 'category'},
            {header: 'Brand', field: 'brand'},
            {header: 'Price', field: 'price'}
        ]

        this.chartInit()
        this.initChart()

    }

    loadTopProducts() {
        let productMap = new Map<string, OrderItemImpl>();

        this.orders.forEach(order => {
            order.items.forEach(orderItem => {
                if (productMap.has(orderItem.equipment.title)) {
                    productMap.get(orderItem.equipment.title)!.quantity += orderItem.quantity;
                } else {
                    productMap.set(orderItem.equipment.title, { ...orderItem });
                }
            });
        });

        let allProducts = Array.from(productMap.values());
        this.topProducts = allProducts.sort((a, b) => b.quantity - a.quantity).slice(0, 5);

        this.totalSold = this.topProducts.reduce((sum, product) => sum + product.quantity, 0);
        this.totalTarget = allProducts.reduce((sum, product) => sum + product.quantity, 0);
        this.totalPercentage = this.totalTarget ? Math.round((this.totalSold / this.totalTarget) * 100) : 0;

    }

    initChart() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color')
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color')
        const surfaceLight = getComputedStyle(document.body).getPropertyValue('--surface-100')

        this.visitorChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    data: [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
                    backgroundColor: primaryColor,
                    fill: true,
                    barPercentage: 0.75,
                    stepped: true
                }
            ]
        };

        this.visitorChartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    min: 500,
                    max: 900,
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: surfaceLight
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        display: false
                    }
                }
            }
        };
    }

    chartInit() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const surface300 = getComputedStyle(document.body).getPropertyValue('--surface-300');

        this.items = [
            {
                label: 'Options',
                items: [
                    {label: 'Add New', icon: 'pi pi-fw pi-plus'},
                    {label: 'Search', icon: 'pi pi-fw pi-search'}
                ]
            }];

        this.chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'New',
                    data: [11, 17, 30, 60, 88, 92],
                    backgroundColor: 'rgba(13, 202, 240, .2)',
                    borderColor: '#0dcaf0',
                    pointBackgroundColor: '#0dcaf0',
                    pointBorderColor: '#0dcaf0',
                    pointBorderWidth: 0,
                    pointStyle: 'line',
                    fill: false,
                    tension: .4
                },
                {
                    label: 'Completed',
                    data: [11, 19, 39, 59, 69, 71],
                    backgroundColor: 'rgba(253, 126, 20, .2)',
                    borderColor: '#fd7e14',
                    pointBackgroundColor: '#fd7e14',
                    pointBorderColor: '#fd7e14',
                    pointBorderWidth: 0,
                    pointStyle: 'line',
                    fill: false,
                    tension: .4
                },
                {
                    label: 'Canceled',
                    data: [11, 17, 21, 30, 47, 83],
                    backgroundColor: 'rgba(111, 66, 193, .2)',
                    borderColor: '#6f42c1',
                    pointBackgroundColor: '#6f42c1',
                    pointBorderColor: '#6f42c1',
                    pointBorderWidth: 0,
                    pointStyle: 'line',
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    fill: true,
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    max: 100,
                    min: 0,
                    grid: {
                        color: surface300
                    },
                    ticks: {
                        color: textColor
                    }
                },
                x: {
                    grid: {
                        display: true,
                        color: surface300
                    },
                    ticks: {
                        color: textColor,
                        beginAtZero: true,
                    }
                }
            }
        };
    }

    onEmojiClick(chatInput: any, emoji: string) {
        if (chatInput) {
            chatInput.value += emoji;
            chatInput.focus();
        }
    }
    get payedOrders() {
        return this.orders.filter(order => order.paymentStatus === 'Payed');
    }

    get calculateOrderProfit(): number {
        return this.orders
            .filter(order => order.paymentStatus === 'Payed')
            .reduce((gain, order) => {
                const orderTotal = order.items.reduce((sum, item) => sum + item.totalPrice, 0);
                return gain + orderTotal;
            }, 0);
    }

    get calculateRepairProfit(): number {
        return this.repairs
            .filter(repair => repair.paymentStatus === 'PAYED')
            .reduce((total, repair) =>
                total + repair.price, 0);
    }
    get calculateEquipmentRepairProfit(): number {
        return this.repairs
            .filter(repair => repair.paymentStatus +'' === 'PAYED')
            .reduce((gain, repair) => {
                const orderTotal = repair.items.reduce((sum: any, item: { price: any; }) => sum + item.price, 0);
                return gain + orderTotal;
            }, 0);
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
