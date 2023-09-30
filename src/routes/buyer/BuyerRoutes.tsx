import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react';

const BuyerCreateAccount = lazy(() => import('../../authentication/buyerAuth/BuyerCreateAccount'))
const BuyerLogin = lazy(() => import('../../authentication/buyerAuth/BuyerLogin'));
const BuyerHomeLayout = lazy(() => import('./BuyerHomeLayout'));
const Purchases = lazy(() => import('../../componants/buyer/purchases/Purchases'));
const PurchaseDetail = lazy(() => import('../../componants/buyer/purchases/PurchaseDetail'));
const Stores = lazy(() => import('../../componants/buyer/store/Store'));
const StoreProducts = lazy(() => import('../../componants/buyer/store/StoreProducts'));
const Orders = lazy(() => import('../../componants/buyer/orders/Orders'));

const BuyerRoutes = () => {

let token = localStorage.getItem('accessToken')

    return (
        <main>


            <Suspense fallback={<h1>loading...</h1>}>
                <Routes>
                    <Route path='/BuyerCreateAccount' element={<BuyerCreateAccount />} />
                    <Route path='/BuyerLogin' element={<BuyerLogin />} />
                    <Route path='/Buyer/' element={<BuyerHomeLayout />}>
                        <Route path='Purchases' element={<Purchases />} />
                        <Route path='Purchase/Detail' element={<PurchaseDetail />} />
                        <Route path='Orders' element={<Orders />} />
                        <Route path='Stores' element={<Stores />} />
                        <Route path='Store/Products/:storeId' element={<StoreProducts/>} />
                        <Route path='Orders' element={<Orders />} />
                    </Route>
                </Routes>
            </Suspense>
        </main>
    )
}

export default BuyerRoutes;