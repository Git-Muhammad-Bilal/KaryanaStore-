export interface productsTypes {
    productName: string,
    quantity: number | undefined,
    cost: number | undefined ,
    price: number | undefined ,
     
}

export interface inputProducttypes{
    productName: String,
    quantity: Number,
    cost: Number,
    price: Number,
     _id: Number,
    userId: Number

}

export interface BuyerInfoTypes {
        buyerName:string,
        purchases:[],
        _id:number,   
 }