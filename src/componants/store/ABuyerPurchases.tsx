import axiosApi from '../../axios/axiosApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RenderSales from './RenderSales';
import "../../karyanaStoreStyless/buyerInfo.css"
// import { QuerydataTypes } from '../../hooks/quyeryDataTypes';


const ABuyerPurchases = () => {

    const [products, setProducts] = useState<[]>([]);
    const [purchasesOfABuyer, setPurchasesOfABuyer] = useState<[]>([]);
    let id = useParams<string>()
     
    console.log(id, 'id');

     
    useEffect(() => {

        let fetchPurchasesOfABuyer = async () => {
            try {
                let { data } = await axiosApi.get(`/getBuyersPurchases/${id}`)
                console.log(data,'data');
                
                console.log(data[0].purchases[0].purchaseId);
                setPurchasesOfABuyer(data[0].purchases)
                
                let result = await axiosApi.get(`/getProducts`)
               console.log(result,'result');
               
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
