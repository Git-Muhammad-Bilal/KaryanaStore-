import { useEffect, useState } from 'react'
import axiosApi from '../../../axios/axiosApi';
import PurchaseList from './purchaseList';
import { PurchaseTypes } from '../../../hooks/quyeryDataTypes';
import "../../../karyanaStoreStyless/buyerInfo.css"
import "../../../karyanaStoreStyless/home.css"
import "../../../karyanaStoreStyless/productList.css"

let totalPurchase: number = 10340;

const Purchases = () => {

    const [purchases, setPurchases] = useState<PurchaseTypes[]>({} as PurchaseTypes[]);


    useEffect(() => {
        let fetchPurch = async () => {
            let { data } = await axiosApi.get('/getPurchases')

            setPurchases(data);
        }
        // let token = localStorage.getItem('accessToken');
        // if (token) {
            fetchPurch()
        // }
        // return () => {
        // }
    }, [])

    const deletePruchase = async (id: number) => {
        let { data } = await axiosApi.delete(`deletePurchase/${id}`)
        totalPurchase = 0
        setPurchases(data)
    }

    return (

        <div className='purchaes-container'>
            <div className='total-spending'>
                <h1>Total Purchaes: {totalPurchase}</h1>
            </div>
            {
                purchases.length && purchases.map((p: PurchaseTypes, index) => {
                    totalPurchase = Number(p.price) + totalPurchase



                    return <PurchaseList key={p._id} purchase={p} deletePruchase={deletePruchase} />

                })
            }

        </div>
    )
}


export default Purchases;
