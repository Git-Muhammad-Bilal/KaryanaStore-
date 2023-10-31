import { useParams } from 'react-router-dom';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useErrorBoundary } from 'react-error-boundary';
import {  PurchaseTypes } from '../../hooks/quyeryDataTypes';
import axiosApi from '../../axios/axiosApi';
import "../../karyanaStoreStyless/buyerInfo.css"

const RenderSales = ({ purchases, productsFromBuyers , setSales }: { purchases: any, productsFromBuyers?: [] ,setSales?:any }) => {
    
    const { setQuery, queryData, navigateTo } = useBase64Query();
    const { showBoundary } = useErrorBoundary()
    let prams = useParams();
    let buyerId = prams?.buyerId
    let productId = prams?.productId

    async function deletePurchaseFromAProduct(purchaseId: number, quantity: number) {
        try {
            let {data} = await axiosApi.delete(`/deletePurchaseFromAproduct/${purchaseId}`)
            let ProdInfo = {
                ...queryData,
                quantity: queryData?.quantity + quantity
             }
            setSales(data)
            let prodBtoaData = btoa(JSON.stringify(ProdInfo))
            setQuery('product', prodBtoaData);
            // navigateTo(`/store/products/Sales/${productId}`, null)
      } catch (error) {
            console.log(error);
            showBoundary(error)
          }

    }

    
    let renderPurchases = () => {
           return  purchases?.map((p: PurchaseTypes) => {
             const { productName, buyerName, quantity, cost, price, _id, product } = p.purchaseId || p;
              if (productId === product?.toString() || buyerId === product?.toString()) {
                return <div key={_id} className='puchases-details'>
                    <div><p>{buyerName}</p></div>
                    <div><p>{productName}</p></div>
                    <div><p>{quantity}</p></div>
                    <div><p>{cost}</p></div>
                    <div><p>{price}</p></div>
                    <div className="buyer-info-btns">
                        <button onClick={() => { deletePurchaseFromAProduct(_id, quantity) }}>delete</button>
                    </div>
                </div>
            }
           })  
     }


    return (
        <>
           {renderPurchases()}
        </>

)
}


export default RenderSales;

{/* <button onClick={() => editPurchaseOfAProduct(p.purchaseId || p)}>edit</button> */}
        
            // function editPurchaseOfAProduct(purchase: PurchaseTypes) {
            //     let prod;
            //     prod = productsFromBuyers?.find(({ productName, quantity, cost, price, userId, _id }: QuerydataTypes) => _id === purchase.product && {
            //         productName,
            //         quantity,
            //         cost,
            //         price,
            //         store: userId,
            //         productId: _id
            //     })
            //     prod = prod || queryData
        
            //     let ProdInfo = {
            //         productDet: {
            //             ...prod,
            //         },
            //         purchase: {
            //             ...purchase
            //         }
            //     }
        
            //     let prodBtoaData = btoa(JSON.stringify(ProdInfo))
            //     setQuery('product', prodBtoaData);
        
            //     productsFromBuyers?.length ? (navigateTo(`/store/products/EditPurchase/${buyerId}`, null)) :
            //         navigateTo(`/store/products/EditPurchase/${purchase.product}`, null)
        
            // }