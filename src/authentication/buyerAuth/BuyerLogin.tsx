import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginBuyerMutation } from "../../reduxStore/Buyer/createBuyerSlice";
import { Buyer } from "../../reduxStore/Buyer/types/buyertypes";
import "../../karyanaStoreStyless/login.css"



const BuyerLogin = () => {


    const [buyerDetail, setBuyerDetail] = useState<Buyer>({
        email: 'b@gmail.com',
        password: '123'
    });
    
    let navigate = useNavigate();
    const data = useLoginBuyerMutation()
     
      const [loginBuyer] = data;
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



    const navigateToHome =async () => {
       await loginBuyer(buyerDetail)
       navigate('/Buyer/Purchases', {replace:true})

    }
    return (

        <div className="login-container">
            <div className="as-buyer">
                <NavLink replace to='/'>
                    <button>#Store</button>
                </NavLink>
            </div>
            <div className="karyanaName-container">
                <h1>Karyana</h1>
                <p>We help your do your grocris!</p>
            </div>
            <div className="lgn-inputs-cont">
                <input
                    type="text"
                    placeholder="Email Adress"
                    name="email"
                    value={buyerDetail.email}
                    onChange={(e) => setBuyerDet(e)}
                />
                <input type="text"
                    name="password"
                    placeholder="Password"
                    value={buyerDetail.password}
                    onChange={(e) => setBuyerDet(e)}
                />

                <div className="lgn-buttons-cont">

                    <button onClick={navigateToHome}>Login</button>
                    <NavLink replace to='/BuyerCreateAccount' ><button>CreateAccount</button></NavLink>
                </div>

                {/* <h2>{userNotFound}</h2> */}

            </div>

        </div>


    );
}

export default BuyerLogin;