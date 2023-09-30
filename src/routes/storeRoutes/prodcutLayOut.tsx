import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react'



const ProductLayOut = ({ userId }:{userId:number}) => {

   return (
      <div className='links-container'>
         <div className='header-links-container'>

            <div className='header-button-cont'>
               <NavLink to='ProductList'>
                  <button>Product List</button>
               </NavLink>
               <NavLink to='CreateProduct'>
                  <button>Create Product</button>
               </NavLink>
               <NavLink to='Buyers'>
                  <button>Buyers</button>
               </NavLink>
            </div>

         </div>
            <div className="products-det-body">
               <Suspense fallback='loading resources...'>
                  <Outlet context={{ userId }} />
               </Suspense>
            </div>
      </div>
   )


}

export default ProductLayOut;