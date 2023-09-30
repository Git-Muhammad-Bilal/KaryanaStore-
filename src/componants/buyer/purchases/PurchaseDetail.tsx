import React from 'react'
import "../../../karyanaStoreStyless/buyerStyles/purchaseDetail.css"
import { useNavigate } from 'react-router-dom';
function PurchaseDetail() {
  let navigate = useNavigate()
  return (
    <div className="purchase-det">
      <div className="purchase-info">
        <div className="purch-from">
          <p className='sn'>ABC Karyana</p>
          <div className='purch-at'>

            <p className='dt'>20/5/2023</p>
            <p className='dt'>4:50</p>
          </div>
        </div>
        <div className='back'>
          <button onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="purchase">
        <div><p>Oil</p></div>
        <div><p>Peter Parker</p></div>
        <div><p>5/liter</p></div>
        <div><p>1120</p></div>
      </div>
    </div>
  )
}

export default PurchaseDetail;