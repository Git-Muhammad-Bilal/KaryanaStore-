export interface productsTypes {
    productName: string,
    quantity: number | undefined,
    cost: number | undefined,
    price: number | undefined,
    _id?: number

}

export interface inputProducttypes {
    productName: String,
    quantity: Number,
    cost: Number,
    price: Number,
    _id: Number,
    userId: Number,
    storeName?: string,

}

export interface BuyerInfoTypes {
    buyerName: string,
    purchases: [],
    _id: number,
}

export interface extedndedProductTypes extends inputProducttypes {
    notfiedPurchases: {
        productId: string,
        purchaseCount: string

    }
}