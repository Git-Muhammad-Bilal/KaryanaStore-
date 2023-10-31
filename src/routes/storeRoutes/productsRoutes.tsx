import { Routes, Route, useParams, Navigate, Outlet } from 'react-router-dom'
import {useState} from 'react';
import { lazy} from 'react'
import { localStorageTypes } from '../../axios/axiosApi';

const ProductLayOut = lazy(() => import('./prodcutLayOut'));
const CreateProduct = lazy(() => import('../../componants/store/CreateProduct'));
const ProductList = lazy(() => import('../../componants/store/ProductList'));
const Sales = lazy(() => import('../../componants/store/Sales'));
const CreatePurchase = lazy(() => import('../../componants/store/purchasesAddOrCreate/CreatePurchase'));
const EditPurchase = lazy(() => import('../../componants/store/purchasesAddOrCreate/EditPurchase'));
const Buyers = lazy(() => import('../../componants/store/Buyers'));
const ABuyerPurchases = lazy(() => import('../../componants/store/ABuyerPurchases'));

const ProuductRoutes = () => {
   
    const [isNewNotfn, setIsNewNotfn] = useState(0);
     
    let { id } = useParams();
    
    const jwt:any = localStorage.getItem('accessToken')
     const strg:localStorageTypes = JSON.parse(jwt)
   
     if (!strg?.accessToken) {
        return <Navigate to={'/'}/>
    }

    return (
            <>
            <Routes >
                <Route path='products' element={<ProductLayOut userId={Number(id)} isNewNotfn ={isNewNotfn}   />}>
                    <Route path='CreateProduct' element={<CreateProduct />} />
                    <Route path='ProductList'  element={<ProductList setIsNewNotfn ={setIsNewNotfn} />} />
                    <Route path='Sales/:productId'  element={<Sales setIsNewNotfn = {setIsNewNotfn}/>} />
                    <Route path='CreatePurchase/:productId' element={<CreatePurchase  />} />
                    <Route path='EditPurchase/:buyerOrProductId' element={<EditPurchase />} />
                    <Route path='Buyers' element={<Buyers />} />
                    <Route path='ABuyerPurchases/:buyerId' element={<ABuyerPurchases />} />
                   
                </Route>
          
            </Routes>


            </>
    );
}

export default ProuductRoutes;