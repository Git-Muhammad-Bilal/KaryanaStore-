import axiosApi from '../../axios/axiosApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RenderPurchases from './RenderPurchases';
import "../../karyanaStoreStyless/buyerInfo.css"
// import { QuerydataTypes } from '../../hooks/quyeryDataTypes';


const ABuyerPurchases = () => {

    const [products, setProducts] = useState<[]>([]);
    const [purchasesOfABuyer, setPurchasesOfABuyer] = useState<[]>([]);
    let { buyerId } = useParams<string>()

    useEffect(() => {

        let fetchPurchasesOfABuyer = async () => {
            try {
                let { data } = await axiosApi.get(`/getBuyersPurchases/${buyerId}`)
                console.log(data[0].purchases[0].purchaseId);
                setPurchasesOfABuyer(data[0].purchases)
                
                let result = await axiosApi.get(`/getProducts`)
                setProducts(result.data)

            } catch (error) {
                console.log(error);
            }
        }

        return () => {
            fetchPurchasesOfABuyer()
        }
    }, [buyerId]);


    return (
        <div className='Abuyer-purchases-cont'>
            <RenderPurchases
                purchases={purchasesOfABuyer}
                productsFromBuyers={products}
            />
        </div>

    )
}





export default ABuyerPurchases;



 // async function deleteBuyerFromAProduct(buyerId) {
 //     let { data } = await axios.get(`http://localhost:3003/deleteBuyerFromAproduct/${buyerId}`)
 //     setBuyers(data);
 // }


 // function editBuyerOfAProduct(buyerId, buyerForEdit) {
 //     navigation(`/store/${userId}/products/AddProductModal/${buyerId}`, { state: { ...buyerForEdit, buyerId } })
 // }

 // let showEachBuyerDetail = async (buyerId, buyerName) => {
 //     console.log(buyerId);
 //     navigation(`/store/${userId}/products/Purchases/${buyerId}`, { state: { ...state, buyerName } })
 // }

 // function renderBuyers() {

 //     return buyers.length && buyers?.map((b) => {

 //         return <tr key={b._id}>
 //             <td><p>{b.buyerName}</p></td>
 //             <div className="buyer-info-btns">
 //                 {/* <button onClick={() => editBuyerOfAProduct(b._id, b)}>edit</button>
 //                 <button onClick={() => { deleteBuyerFromAProduct(b._id) }}>delete</button>
 //                 <button onClick={() => { showEachBuyerDetail(b._id, b.buyerName) }}>Purchases</button> */}
 //             </div>
 //         </tr>
 //     })
 // }
