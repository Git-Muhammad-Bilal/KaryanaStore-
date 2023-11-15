export interface BuyerTypes {
    buyerName?: string,
    productName?: string,
    quantity?: number | string,
    cost?: number | string,
    price?: number | string
}

export interface AddQuanityTypes {
    value: number,
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>
    setQuantity: React.Dispatch<React.SetStateAction<number | undefined>>

}

