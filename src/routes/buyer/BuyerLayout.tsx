import { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react'
import LogOutComp from '../../authentication/logout';
import axiosApi from '../../axios/axiosApi';
import "../../karyanaStoreStyless/home.css"
import "../../karyanaStoreStyless/productList.css"
import "../../karyanaStoreStyless/buyerStyles/purchaseDetail.css"
import { useAppSlector , useAppDispatch} from '../../reduxStore/store/StoreTypes';
import { fetchBuyerName } from '../../reduxStore/Buyer/BuyerNameSlice';
const BuyerLayout = ({setGetBName}:{setGetBName:React.Dispatch<React.SetStateAction<string>>}) => {
   const [userName, setUserName] = useState<string>('')
    // let state = useAppSlector((state)=>state.getBuyerName)
   // let dispatch = useAppDispatch()  
   // dispatch(fetchBuyerName)
    useEffect(() => {
     const fetchStoreName = async () => {
         const { data } = await axiosApi.get('/buyerName')
         console.log(data, 'data');
         setUserName(data)
         setGetBName(data) 
      }
      let token = localStorage.getItem('accessToken');
      
      fetchStoreName()
   }, [])



   return (
      <div className='home-container'>
         <div className='home-header-container'>
            <div className="Karyana-name">
               <h1>karyana </h1>

            </div>
            <div className="logOut-btn">
               <LogOutComp />
               {/* <StoreProfile /> */}
               <div className='userName'>
                  <p >{userName}</p>

               </div>
            </div>

         </div>

         <div className='links-container'>
            <div className='header-links-container'>

               <div className='header-button-cont'>
                  <NavLink  className='link' to='Purchases'>
                     <button>Purchases</button>
                  </NavLink>
                  <NavLink  className='link' to='Stores'>
                     <button>Stores</button>
                  </NavLink>
                  <NavLink   className='link' to='Orders'>
                     <button>Orders</button>
                  </NavLink>
               </div>
            </div>
            <div className="products-det-body">
               <Suspense fallback='loading resources...'>
                  <Outlet />
               </Suspense>
            </div>


         </div>
      </div>
   )


}

export default BuyerLayout;