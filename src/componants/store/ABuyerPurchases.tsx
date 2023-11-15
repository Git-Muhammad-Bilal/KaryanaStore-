import axiosApi from '../../axios/axiosApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RenderSales from './RenderSales';
import "../../karyanaStoreStyless/buyerInfo.css"


const ABuyerPurchases = () => {

    const [products, setProducts] = useState<[]>([]);
    const [purchasesOfABuyer, setPurchasesOfABuyer] = useState<[]>([]);
    let id = useParams<string>()



    useEffect(() => {

        let fetchPurchasesOfABuyer = async () => {
            try {
                let { data } = await axiosApi.get(`/getBuyersPurchases/${id?.buyerId}`)
                setPurchasesOfABuyer(data[0].purchases)

                let result = await axiosApi.get(`/getProducts`)
                setProducts(result.data)

            } catch (error) {
                console.log(error);
            }
        }

        fetchPurchasesOfABuyer()

    }, [id]);


    return (
        <div className='Abuyer-purchases-cont'>
            <RenderSales
                purchases={purchasesOfABuyer}
                productsFromBuyers={products}

            />
        </div>

    )
}





export default ABuyerPurchases;



