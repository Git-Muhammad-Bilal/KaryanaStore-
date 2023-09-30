export interface QuerydataTypes {
    productName: string,
    quantity: number ,
    cost: number,
    price: number,
    _id: number,
    userId: number,
    productId:number
    store: number,
    storeName:string,
    products:[]
    productDet: {
        productName: string,
        quantity: number,
        cost: number,
        price: number,
        _id: number,
        userId: number,
        store: number,
        productId:number
    },
    purchase: {
        buyerName: string,
        productName: string,
        quantity: number ,
        cost: number,
        price: number,
        _id: number,
        userId: number,
        store: number,
        buyer:number
        product:number,
    }
    
}

export interface product extends QuerydataTypes {
    
    
    
    
}

export interface PurchaseTypes  {
    
    buyerName: string,
    productName: string,
    quantity: number ,
    cost: number,
    price: number,
    _id: number,
    userId: number,
    store: number,
    buyer:number,
    product:number,
    purchaseId?:{
        buyerName: string,
    productName: string,
    quantity: number ,
    cost: number,
    price: number,
    _id: number,
    userId: number,
    store: number,
    buyer:number,
    product:number,
    }
    
    

}

