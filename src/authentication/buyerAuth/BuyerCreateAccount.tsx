import { NavLink, useNavigate } from "react-router-dom";
import "../../karyanaStoreStyless/createAccount.css"
import "../../karyanaStoreStyless/login.css"
import { useCreateBuyerAccountMutation } from "../../reduxStore/Buyer/createBuyerSlice";
import { Buyer } from "../../reduxStore/Buyer/types/buyertypes";
import { useState } from "react";



export const BuyerCreateAccount = () => {
  const [buyerDetail, setBuyerDetail] = useState<Buyer>({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  let navigate = useNavigate();

  const [createBuyerAccount] = useCreateBuyerAccountMutation()

  const setBuyerDet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    for (const key in buyerDetail) {

      if (key === name) {
        setBuyerDetail((previousState: Buyer) => {
          return { ...previousState, [key]: value }
        })
      }
    }

  }

  const createBuyer = async () => {
    await createBuyerAccount(buyerDetail)
    navigate('/Buyer/Purchases', { replace: true })
  }



  return (
    <div className="createAccount-container">
      <div className="as-buyer">
        <NavLink replace to='/'>
          <button>#Store</button>
        </NavLink>
      </div>
      <div className="karyanaName-container">
        <h1>Karyana</h1>
        <p>Doing grocries has never been easy!</p>
      </div>
      <div className="creAcc-Fields-cont">

        <input
          name="name"
          type="text"
          placeholder="Frist Name"
          value={buyerDetail.name}
          onChange={(e) => setBuyerDet(e)}
        />
        <input type="text"
          name="lastName"
          placeholder="Last Name"
          value={buyerDetail.lastName}
          onChange={(e) => setBuyerDet(e)}
        />
        <input type="text"
          name="email"
          placeholder="Your Email"
          value={buyerDetail.email}
          onChange={(e) => setBuyerDet(e)}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={buyerDetail.password}
          onChange={(e) => setBuyerDet(e)}
        />

        <div className="creAcc-btn-cont">
          <button onClick={createBuyer}>Sign Up</button>
          <NavLink replace to="/BuyerLogin"><button>Or Login</button></NavLink>
        </div>
      </div>
    </div>
  )
}



export default BuyerCreateAccount;

