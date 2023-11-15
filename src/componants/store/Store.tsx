import React, { useEffect, useState } from 'react'
import ProuductRoutes from '../../routes/storeRoutes/productsRoutes';
import LogOutComp from '../../authentication/logout';
import StoreProfile from '../../profileImage/StoreProfile';
import "../../karyanaStoreStyless/home.css"
import "../../karyanaStoreStyless/createAccount.css"
import { log } from 'console';
import { Navigate } from 'react-router-dom';

const Store = () => {
   
    return (
        <div className='home-container'>
            <div className='home-header-container'>
                <div className="Karyana-name">
                    <h1>karyana </h1>

                </div>
                <div className="logOut-btn">
                    <LogOutComp />
                    <StoreProfile />
                  
                </div>

            </div>
            <div className="home-body">
                <ProuductRoutes />
            </div>
        </div>
    );
}

export default Store;