import React from 'react'
import { useNavigate } from 'react-router-dom'

const PurchaseList =() => {
    let navigat = useNavigate()
       
    const navigateToPurDet = () => {
        navigat('/Buyer/Purchase/Detail')
    }

  return (
    <div className='purchaes-list buyer-puchases-list'>
                <div className='puchases-details'>

                    <div><p>Oil</p></div>
                    <div><p>Peter Parker</p></div>
                    <div><p>5/liter</p></div>
                    <div><p>1120</p></div>
                    <div className="buyer-info-btns">
                        <button>delete</button>
                        <button onClick={navigateToPurDet}>Detail</button>
                    </  div>

                </div>


                {/* <RenderPurchases purchases={purchases} /> */}
            </div>


  )
}
export default  PurchaseList;