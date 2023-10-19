import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosApi from '../../../axios/axiosApi'
import { PurchaseTypes } from '../../../hooks/quyeryDataTypes'



const PurchaseList =({purchase, deletePruchase}:{purchase:PurchaseTypes,deletePruchase:(id:number)=>void}) => {
    
  return (
     
    <div className='purchaes-list buyer-puchases-list'>
                <div className='puchases-details'>

                    <div><p>{purchase.productName}</p></div>
                    <div><p>{purchase.buyerName}</p></div>
                    <div><p>{purchase.quantity}kg/liter</p></div>
                    <div><p>Rs.{purchase.price}</p></div>
                    <div><p>{purchase.purchaseDate}</p></div>
                    <div><p>{purchase.purchaseTime}</p></div>
                    <div><p>{purchase.storeName}</p></div>
                    <div className="buyer-info-btns">
                        <button onClick={()=>deletePruchase(purchase._id)}>delete</button>
                    </  div>

                </div>


                {/* <RenderPurchases purchases={purchases} /> */}
            </div>


  )
}
export default  PurchaseList;