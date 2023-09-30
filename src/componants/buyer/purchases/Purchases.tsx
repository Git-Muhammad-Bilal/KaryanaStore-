import React, { useEffect, useState } from 'react'
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';
// import RenderPurchases from '../store/RenderPurchases';
// import { useBase64Query } from '../../hooks/useBase64Query';
// import { useErrorBoundary } from 'react-error-boundary';
import "../../../karyanaStoreStyless/buyerInfo.css"
import "../../../karyanaStoreStyless/home.css"
import "../../../karyanaStoreStyless/productList.css"
import PurchaseList from './purchaseList';
// import { useGetPurchasesQuery } from '../../reduxStore/karyanaStore/purchaseSlice';
// import { QuerydataTypes } from '../../hooks/quyeryDataTypes';
const Purchases = () => {

    // let { productId } = useParams();
    // const { showBoundary } = useErrorBoundary()
    // const { queryData, genPath } = useBase64Query();
    // const { data , isError, error } = useGetPurchasesQuery(productId)

    //  let  purchases: [] = data
    //  console.log(purchases, 'puras;kjfsdafkj');

    // isError && showBoundary(error)
    

    return (
        <div className='purchaes-container'>
         <div className='total-spending'>
              <h1>Totoal Purchases 50343</h1>
         </div>
         <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
          <PurchaseList/>
        </div>
    )
}


export default Purchases;
