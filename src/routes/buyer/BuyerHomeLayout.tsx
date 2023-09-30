import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react'
import "../../karyanaStoreStyless/home.css"
import "../../karyanaStoreStyless/productList.css"
import LogOutComp from '../../authentication/logout';


// const ProductLayOut = ({ userId }:{userId:number}) => {
const BuyerHomeLayout = () => {

   return (
      <div className='home-container'>
         <div className='home-header-container'>
            <div className="Karyana-name">
               <h1>karyana </h1>

            </div>
            <div className="logOut-btn">
               <LogOutComp />
               {/* <StoreProfile /> */}

            </div>

         </div>
         
            <div className='links-container'>
               <div className='header-links-container'>

                  <div className='header-button-cont'>
                     <NavLink className='link' to='Purchases'>
                        <button>Purchases</button>
                     </NavLink>
                     <NavLink className='link'  to='Stores'>
                        <button>Stores</button>
                     </NavLink>
                     <NavLink className='link' to='Orders'>
                        <button>Orders</button>
                     </NavLink>
                  </div>
               </div>
                  <div className="products-det-body">
                     <Suspense fallback='loading resources...'>
                        {/* <Outlet context={{ userId }} /> */}
                        <Outlet />
                     </Suspense>
                  </div>

            
         </div>
      </div>
   )


}

export default BuyerHomeLayout;