import axiosApi from '../../axios/axiosApi';
import React, { useEffect, useState } from 'react'
import "../../karyanaStoreStyless/buyerList.css"
import { useBase64Query } from '../../hooks/useBase64Query';
import { useErrorBoundary } from 'react-error-boundary';
import { BuyerInfoTypes } from './storeTypes';


const BuyerInfo = () => {
    const [buyers, setBuyers] = useState<BuyerInfoTypes[]>();
      
    const {showBoundary}=useErrorBoundary()
      
    const { navigateTo } = useBase64Query()
    
    useEffect(() => {
       
        let fetchBuyers = async () => {
            
            try {
                let { data } = await axiosApi.get(`/getBuyers`)
                 console.log(data,'data');
                 
                console.log(data);
                
                if (data.length) {
                    setBuyers(data)
                }else{
                    throw new Error('Could not fetch buyers! please Reoload')
                }
                
            } catch (error) {
                showBoundary(error)
            }
        }

        fetchBuyers()
       
    }, []);


    function renderEachBuyerDetails(buyerId:number) {
        navigateTo(`/store/products/ABuyerPurchases/${buyerId}`, null)

    }
    async function deleteBuuyer(buyerId:number) {
    try {
        
        let { data } = await axiosApi.get(`/deleteBuyer/${buyerId}`)
        setBuyers(data)
    } catch (error) {
           console.log(error);
           
    }
    }

    function renderBuyers() {

        return !buyers?.length ? <h1>You Do not have Any Buyers Yet!</h1> :
            buyers.map((b, index) => {
                
                return <div key={index} className='buyerList-table'>

                    <div className='buyer-Name-cont'>
                        <p>{b.buyerName}</p>
                    </div>
                    <div>
                        <p>{b?.purchases?.length} purchases</p>
                    </div>
                    <div className='buyers-purchases-cont'>
                        <button onClick={() => { renderEachBuyerDetails(b._id) }}>Purchases</button>
                        <button onClick={() => { deleteBuuyer(b._id) }}>Delete</button>
                    </div>
                </div>
            }
            )
    }

    return (

        <div className='buyerList-conatiner'>
            {renderBuyers()}

        </div>
    )
}


export default BuyerInfo;



