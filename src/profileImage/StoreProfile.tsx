import React, { useEffect, useState, useRef } from 'react'
import avatar from './default.jpg'
import '../karyanaStoreStyless/profile.css'
import axiosApi from '../axios/axiosApi'
import ProfilePopUp from './ProfilePopUp'
import { useErrorBoundary } from 'react-error-boundary'

let token = localStorage.getItem('accessToken')
let url = 'http://localhost:3003'

const StoreProfile = () => {

   const [storeProfile, setStoreProfie] = useState<any>();
   const [isPopUp, setIsPopUp] = useState<boolean>(false);
   const { showBoundary } = useErrorBoundary()
    
    
   function openPopUp() {
      setIsPopUp(!isPopUp);
   }

   useEffect(() => {

      let result = async () => {
         try {
            let data = await axiosApi.get('/getStoreProfile')
            data.data === '' ? setStoreProfie(null) : setStoreProfie(data.data)

         } catch (error) {
            showBoundary(error)

         }
      }
      result()
      

   }, [])

   const [fetchStNm, setFetchStNm] = useState<string>('');

   useEffect(() => {
         
      const fetchStoreName = async () => {
         const { data } = await axiosApi.get('/getStoreName')
         setFetchStNm(data)
      }

      if (token) {
         fetchStoreName()
         
      }
      

   }, [])


   return (
      <div className="profile-image-cont">
         <div className="profile-img">

            <img
               src={storeProfile ? `${url}${storeProfile}` : avatar}
               // src={avatar}
               alt="upload proile"
               className='img'
               onClick={openPopUp}
            />
         </div>
         <div className='store-name'>
            <p>{fetchStNm} </p>
         </div>
         {isPopUp && <ProfilePopUp
            renderProfile={(file) => { setStoreProfie(file) }}
            closePopUp={(setFalse: boolean) => { setIsPopUp(setFalse) }}
            storeProfile={storeProfile}
            avatar={avatar}
         />}
      </div>
   );

}

export default StoreProfile;
