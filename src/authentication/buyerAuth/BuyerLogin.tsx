import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { NavLink, useNavigate } from "react-router-dom";
import "../../karyanaStoreStyless/login.css"
import { useLoginBuyerMutation } from "../../reduxStore/Buyer/createBuyerSlice";
import { Buyer } from "../../reduxStore/Buyer/types/buyertypes";
import ProductLIst from "../../componants/store/ProductList";



const BuyerLogin = () => {

    const [buyerDetail, setBuyerDetail] = useState<Buyer>({
        email: 'bd@gmail.com',
        password: '123'
    });

    let navigate = useNavigate();
    const data = useLoginBuyerMutation()
    console.log(data, 'databuyerlogin');
    
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



    const navigateToHome = () => {
       let okay = loginBuyer(buyerDetail)
          console.log(okay, 'okay');
            
       navigate('/Buyer/Purchases')

    }
    return (

        <div className="login-container">
            <div className="as-buyer">
                <NavLink to='/'>
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
                    <NavLink to='/BuyerCreateAccount' ><button>CreateAccount</button></NavLink>
                </div>

                {/* <h2>{userNotFound}</h2> */}

            </div>

        </div>


    );
}

export default BuyerLogin;