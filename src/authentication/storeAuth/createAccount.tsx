import { useState } from "react";
import axiosApi from "../../axios/axiosApi";
import { NavLink, useNavigate } from "react-router-dom";
import KaryanaNameWithTitle from "./karynanNameWithTitle";
import { useErrorBoundary } from "react-error-boundary";
import "../../karyanaStoreStyless/createAccount.css"
import "../../karyanaStoreStyless/login.css"



const CreateAccount = () => {
    const [name, setName] = useState('a');
    const [lastName, setLastName] = useState('b');
    const [email, setEmail] = useState('ab@gmail.com');
    const [storeName, setStoreName] = useState('ABC');
    const [password, setPassword] = useState('123');
    const { showBoundary } = useErrorBoundary();


    let navigate = useNavigate();
    const CreateAccount = async () => {
        try {
            const { data } = await axiosApi.post('/createAccount',
                {
                    name,
                    lastName,
                    email,
                    storeName,
                    password
                }
            )
            navigate(`/store/products/ProductList`, {replace:true})
        } catch (error) {
            showBoundary(error)

        }
    }




    return (
        <div className="createAccount-container">
            <div className="as-buyer">
                <NavLink replace to='/BuyerLogin'>
                    <button>#Buyer</button>
                </NavLink>
            </div>
            <KaryanaNameWithTitle isSignup={true} />
            <div className="creAcc-Fields-cont">

                <input
                    name="name"
                    type="text"
                    placeholder="Frist Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                />
                <input type="text"
                    name="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="creAcc-btn-cont">

                    <button onClick={CreateAccount}>Sign Up</button>
                    <NavLink to="/"  replace   ><button>Or Login</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;