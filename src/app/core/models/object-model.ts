export class User {
  constructor(
    public aboutYou: string,
    public age: number,
    public agreetc: boolean,
    public dob: string,
    public email: string,
    public gender: string,
    public address: Address,
    public language: string,
    public mobNumber: string,
    public name: string,
    public password: string,
    public uploadPhoto: string,
    public role: string
  ) {}
}

export class Address {
  constructor(
    public id: number,
    public addLine1: string,
    public addLine2: string,
    public city: string,
    public state: string,
    public zipCode: number
  ) {}
}

export interface Product {
  // constructor(
  id: number;
  name: string;
  uploadPhoto: string;
  productDesc: string;
  kind: string;
  status: boolean;
  price: string;
  // ) {}
}

export interface CartProduct extends Product {
  qty: number;
}


// export class Order {
//   public constructor(
//     public id: number,
//     public userId: number,
//     public sellerId: number,
//     public product: Product,
//     public deliveryAddress: Address,
//     public contact: Number,
//     public dateTime: string,
//     public name?: string,
//     public email?:string
//   ) {}

export class Order {
  public constructor(
    public id: number,
    public userId: number, 
    public deliveryAddress: Address,
    public contact: Number,
    public dateTime: string,
    public totalPrice?:number,
    public name?: string,
    public email?:string
  ) {}
}
