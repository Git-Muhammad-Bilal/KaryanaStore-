import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useEffect, useState } from 'react';
import { localStorageTypes } from '../../axios/axiosApi';

const BuyerLayout = lazy(() => import('./BuyerLayout'));
const Purchases = lazy(() => import('../../componants/buyer/purchases/Purchases'));
const Stores = lazy(() => import('../../componants/buyer/store/Store'));
const StoreProducts = lazy(() => import('../../componants/buyer/store/StoreProducts'));
const Orders = lazy(() => import('../../componants/buyer/orders/Orders'));

function BuyerHomeRoutes() {
    let [getBName, setGetBName] = useState<string>('')
    let token:any = localStorage.getItem('accessToken');
    let strg: localStorageTypes = JSON.parse(token);


    if (!strg?.accessToken) {
        return <Navigate to={'/'} />
    }




    return (
        <>
            <Routes>

                <Route path='/Buyer' element={<BuyerLayout setGetBName ={setGetBName}/>}>
                    <Route path='Purchases' element={<Purchases />} />
                    <Route path='Stores' element={<Stores />} />
                    <Route path='Store/Products/:storeId' element={<StoreProducts getBName={getBName}  />} />
                    <Route path='Orders' element={<Orders/>} />

                </Route>
            </Routes>


        </>

    )
}

export default BuyerHomeRoutes;



