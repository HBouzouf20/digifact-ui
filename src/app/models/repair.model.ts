


export interface Repair {
    id?: number;
    reference: string;
    equipment: string[];
    productReference: number;
    brand: number;
    equipmentPrices: EquipmentPrice[];
    client: string;
    dateDepot: string; 
    issue: string;
    status: Status;
    price: number;
    paymentStatus: PaymentStatus;
  }

export interface EquipmentPrice {
    sku: string;
    title: string;
    price: number;
    qte: number;
    total: number;
  }
  
  export interface Status {
    state: string;
  }
  export class StatusImpl implements Status {
    state: string = '';

    constructor(state: string){
      this.state = state;
    }
  }
  export interface PaymentStatus {
    state: string;
  }
  export class PaymentStatusImpl implements PaymentStatus {
    state: string = '';

    constructor(state: string){
      this.state = state;
    }
  }
  

  