export class User{
    name!: string;
    password!: string;
    uploadphoto!: string;
    role!: string;
    mobNumber!:string;
    address!:Address;
    gender!: string;
    language!: string;
    email!: string;
    dob!: string;
    agreetc!: boolean;
    age!: number;
    aboutYou!: string;
}

export class Address{
    id!: number;
    addLine1!: string;
    addLine2!: string;
    city!: string;
    state!: string;
    zipCode!:number;
}

export class Product{
    id!:number;
    name!: string;
    uploadphoto!: string;
    uploadDesc!: string;
    mrp!: number;
    dp!: number;
    status!: boolean;
}

export class Order{
    id!:number;
    nameId!: number;
    sellerId!: number;
    product!: Product;
    deliveryAddress!: Address;
    contact!: number;
    dateTime!: boolean;
}