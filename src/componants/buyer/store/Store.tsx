import React from 'react'
import StoreProfile from '../../../profileImage/StoreProfile';
import '../../../karyanaStoreStyless/buyerStyles/storeList.css'
import { useNavigate } from 'react-router-dom';
import { useGetStoresQuery } from '../../../reduxStore/Buyer/fetchStoresSlice';
import { extractStoreInfo } from '../../../reduxStore/Buyer/storeInfoSlice';
import { useBase64Query } from '../../../hooks/useBase64Query';
import { store } from '../../../reduxStore/Buyer/types/storeInfoTypes';

const Stores = () => {
    let navigate = useNavigate();
    const { data: stores, isError, isLoading, error } = useGetStoresQuery(3)
    const { setQuery, navigateTo } = useBase64Query()

    const navigateToStoreProduct = (store: store) => {
          let storeBtoa = btoa(JSON.stringify(store))
          setQuery('product', storeBtoa);
          navigateTo(`/Buyer/Store/Products/${store?._id}`, null);

    }

    const renderStores = () => {
        return stores?.map((s:store) => {
           const {products, storeName } = s
            return <div className="store-card-cont">
                <div className="store-info-cont">
                    <div className="store-profile-cont">
                        <img src='/download.png' alt="StoreProfile" />

                    </div>
                    <div className='store-Name'>
                        <h3>{storeName}</h3>
                    </div>
                </div>
                <div className="Number-of-Products-cont">
                    <h3>Products in Store {products?.length || null}</h3>
                </div>
                <div className="show-product">
                    <button onClick={() => { navigateToStoreProduct(s) }}>Products</button>
                </div>
            </div>
        })
    }
    return (
        <div className="Store-list-container">
            {renderStores()}
        </div>
    )
}


export default Stores;