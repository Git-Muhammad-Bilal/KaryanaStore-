import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react'
import { useLazyGetSalNotficaionsQuery } from '../../reduxStore/karyanaStore/saleNotificationSlice';


 let token = localStorage.getItem('accessToken')
 
const ProductLayOut = ({ userId, isNewNotfn}: { userId: number, isNewNotfn: number }) => {
   const [notifns, setNotifns] = useState<any>();
   const [getNotifications, result] = useLazyGetSalNotficaionsQuery()
   
   let getND = async () => {
      let count: Number = 0;
      let { data } = await getNotifications('')
      data?.map(({ notfiedPurchases: { purchaseCount } }) => {
         count = Number(purchaseCount) + Number(count)
      })
      
      setNotifns(count)

   }
   
   
   let { pathname } = useLocation()
   useEffect(() => {
      
      getND()
   }, [pathname, isNewNotfn])
  


   return (
      <div className='links-container'>
         <div className='header-links-container'>

            <div className='header-button-cont'>
               <NavLink to='ProductList'>
                  <button>Product List</button>
               </NavLink>
               <NavLink to='CreateProduct'>
                   {
                        notifns !== 0 &&  
                       <div className="header-orders-notification">
                        <p>{notifns}</p>
                     </div>
                  }
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