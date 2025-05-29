import { Injectable } from '@angular/core';
import jsPDFInvoiceTemplate, {
    jsPDF,
    OutputType,
} from 'jspdf-invoice-template';

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    defaultProps = {
        outputType: OutputType.DataUrlNewWindow,
        returnJsPDFDocObject: true,
        orientationLandscape: false,
        compress: false,
        logo: {
            src: '/assets/layout/images/digitrack-logo.png',
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0, //negative or positive num, from the current position
            },
        },
        // stamp: {
        //     inAllPages: true, //by default = false, just in the last page
        //     src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        //     type: 'JPG', //optional, when src= data:uri (nodejs case)
        //     width: 20, //aspect ratio = width/height
        //     height: 20,
        //     margin: {
        //         top: 0, //negative or positive num, from the current position
        //         left: 0 //negative or positive num, from the current position
        //     }
        // },
        business: {
            name: 'DIGITRACK',
            address: '12 rue rahma, Casablanca, Maroc',
            phone: '(+212) 06 92 33 11 11 ',
            email: 'email@example.com',
        },
    };

    props = {
        fileName: 'Facture_réparation_123383',
        contact: {
            label: 'Invoice issued for:',
            name: 'Hamza BOUZOUF\n',
            address: '23 rue menhil, Casablanca ,Maroc',
            phone: '(+212) 069 22 22 222',
            email: 'client@website.al\n\n',
        },
        invoice: {
            label: 'Invoice #: ',
            num: 19,
            // invDate: "Payment Date: 01/03/2025 18:12",
            invGenDate: 'Invoice Date: 02/03/2025 10:17',
            headerBorder: true,
            tableBodyBorder: false,
            header: [
                {
                    title: '#',
                    style: {
                        width: 10,
                    },
                },
                {
                    title: 'Title',
                    style: {
                        width: 30,
                    },
                },
                {
                    title: 'Description',
                    style: {
                        width: 80,
                    },
                },
                { title: 'Price' },
                { title: 'Quantity' },
                { title: 'Unit' },
                { title: 'Total' },
            ],
            table: Array.from(Array(10), (item, index) => [
                index + 1,
                'There are many variations ',
                'Lorem Ipsum is simply dummy text dummy text ',
                200.5,
                4.5,
                'm2',
                400.5,
            ]),
            additionalRows: [
                {
                    col1: 'Total:',
                    col2: '145,250.50',
                    col3: 'ALL',
                    style: {
                        fontSize: 14, //optional, default 12
                    },
                },
                {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10, //optional, default 12
                    },
                },
                {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
                    style: {
                        fontSize: 10, //optional, default 12
                    },
                },
            ],
            invDescLabel: 'Invoice Note',
            invDesc:
                "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
            text: 'The invoice is created on a computer and is valid without the signature and stamp.',
        },
        pageEnable: true,
        pageLabel: 'Page ',
    };
    constructor() {}

    generateFromOrder(orderForm: any) {
        let props = this.getOrderProps(orderForm);
        jsPDFInvoiceTemplate({ ...this.defaultProps, ...props });
    }

    getOrderProps(orderForm: any) {

        return {
            fileName: 'Facture_vente_' + orderForm.reference,
            contact: {
                label: 'Invoice issued for:',
                name: 'Hamza BOUZOUF',
                address: '23 rue menhil, Casablanca ,Maroc',
                phone: '(+212) 069 22 22 222',
                email: 'client@website.al',
            },
            invoice: {
                label: 'Invoice #: ',
                num: orderForm.reference,
                // invDate: "Payment Date: 01/03/2025 18:12",
                invGenDate: 'Invoice Date: ' + orderForm.depositDate,
                headerBorder: true,
                tableBodyBorder: true,
                header: [
                    {
                        title: '#',
                        style: {
                            width: 10,
                        },
                    },
                    {
                        title: 'Sku',
                        style: {
                            width: 55,
                        },
                    },
                    {
                        title: 'Title',
                        style: {
                            width: 55,
                        },
                    },
                    { title: 'Price' },
                    { title: 'Quantity' },
                    { title: 'Unit' },
                    { title: 'Total' },
                ],
                table: orderForm.items.map((e: any, index: any) => {
                    return [
                        index+"\n",
                        e.equipment.sku,
                        e.equipment.title,
                        e.price + ' DH',
                        e.quantity,
                        'Item',
                        e.totalPrice,
                    ];
                }),
                additionalRows: [
                    {
                        col1: 'Total:',
                        col2: orderForm.items
                            .reduce((cc: any, i: any) => {
                                return cc + i.totalPrice;
                            }, 0)
                            .toFixed(2),
                        col3: 'DH',
                        style: {
                            fontSize: 12, //optional, default 12
                        },
                    },
                    {
                        col1: 'TVA:',
                        col2: '20',
                        col3: '%',
                        style: {
                            fontSize: 10, //optional, default 12
                        },
                    },
                    {
                        col1: 'SubTotal:',
                        col2: (
                            orderForm.items.reduce(
                                (cc: any, i: any) => {
                                    return cc + i.totalPrice;
                                },
                                0
                            ) * 0.8
                        ).toFixed(2),
                        col3: 'DH',
                        style: {
                            fontSize: 10, //optional, default 12
                        },
                    },
                ],
            },
            footer: {
                text: 'The invoice is created on a computer and is valid without the signature and stamp.',
            },
            pageEnable: true,
            pageLabel: 'Page ',
        };
    }
}
