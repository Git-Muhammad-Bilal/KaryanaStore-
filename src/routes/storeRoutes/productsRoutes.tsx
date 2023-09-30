import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import { lazy} from 'react'
import React from 'react';
const ProductLayOut = lazy(() => import('./prodcutLayOut'));
const CreateProduct = lazy(() => import('../../componants/store/CreateProduct'));
const ProductList = lazy(() => import('../../componants/store/ProductList'));
const Purchases = lazy(() => import('../../componants/store/Purchases'));
const CreatePurchase = lazy(() => import('../../componants/store/purchasesAddOrCreate/CreatePurchase'));
const EditPurchase = lazy(() => import('../../componants/store/purchasesAddOrCreate/EditPurchase'));
const Buyers = lazy(() => import('../../componants/store/Buyers'));
const ABuyerPurchases = lazy(() => import('../../componants/store/ABuyerPurchases'));

const ProuductRoutes = () => {

    let { id } = useParams();
    
    let token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to={'/'} />
    }

    return (
     
            <Routes >
                <Route path='/products' element={<ProductLayOut userId={Number(id)} />}>
                    <Route path='CreateProduct' element={<CreateProduct />} />
                    <Route path='ProductList' element={<ProductList />} />
                    <Route path='Sales/:productId' element={<Purchases />} />
                    <Route path='CreatePurchase/:productId' element={<CreatePurchase />} />
                    <Route path='EditPurchase/:buyerOrProductId' element={<EditPurchase />} />
                    <Route path='Buyers' element={<Buyers />} />
                    <Route path='ABuyerPurchases/:buyerId' element={<ABuyerPurchases />} />
                </Route>
            </Routes>

    );
}

export default ProuductRoutes;