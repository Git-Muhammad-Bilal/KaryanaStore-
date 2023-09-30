import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import RenderPurchases from './RenderPurchases';
import { useBase64Query } from '../../hooks/useBase64Query';
import { useErrorBoundary } from 'react-error-boundary';
import "../../karyanaStoreStyless/buyerInfo.css"
import { useGetPurchasesQuery } from '../../reduxStore/karyanaStore/purchaseSlice';
import { QuerydataTypes } from '../../hooks/quyeryDataTypes';
const Purchases = () => {

    let { productId } = useParams();
    const { showBoundary } = useErrorBoundary()
    const { queryData, genPath } = useBase64Query();
    const { data , isError, error } = useGetPurchasesQuery(productId)
    
     let  purchases: [] = data
     console.log(purchases, 'puras;kjfsdafkj');
     
    isError && showBoundary(error)
   

    return (
        <div className='purchaes-container'>

            <div className='purchases-header'>

                <div className="ti">

                    <div className='header-titles'>
                        <p>Buyer Name  </p>
                        <p></p>
                    </div>
                    <div className='header-titles'>
                        <p>Prodct Name  </p>
                        <p>{queryData?.productName}</p>
                    </div>
                    <div className='header-titles'>
                        <p>Quantity </p>
                        <p>{queryData?.quantity} Kg/litr</p>
                    </div>
                    <div className='header-titles'>
                        <p>Cost </p>
                        <p> Rs. {queryData?.cost}</p>
                    </div>
                    <div className='header-titles'>
                        <p>Price</p>
                        <p>Rs. {queryData?.price}</p>
                    </div>
                </div>


                <div className='add-btn-cont'>
                    {
                        queryData?.quantity === 0 ? <button className='Add-btn' >Sold</button> :
                            <NavLink to={genPath(`/store/products/createPurchase/${productId}`)}>
                                <button className='Add-btn'> Add </button>
                            </NavLink>
                    }
                </div>
            </div>

            <div>
                <hr />
            </div>
            <div className='purchaes-list'>

                <RenderPurchases purchases={purchases} />
            </div>



        </div>
    )
}


export default Purchases;
