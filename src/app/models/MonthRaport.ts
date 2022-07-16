export interface RaportElement {
  name: string;
  totalPrice: number;
}

export interface MonthRaport {
  paymentMethods: RaportElement[];
  shopMethods: RaportElement[];
  total:number;
}
