import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosApi from '../../axios/axiosApi';
import { useErrorBoundary } from "react-error-boundary";
import KaryanaNameWithTitle from "./karynanNameWithTitle";
import "../../karyanaStoreStyless/login.css"



const LoginComp = () => {

    const [email, setEmail] = useState('x@gmail.com')
    const [password, setPassword] = useState('123')
    const [userNotFound, setUserNotFound] = useState();
    const { showBoundary } = useErrorBoundary()
    let navigate = useNavigate()

    const Login = async () => {
        try {
            const { data } = await axiosApi.post('/login',
                {
                    email,
                    password,
                    store: 'store'
                }
            )
            if (data.err) {
                setUserNotFound(data.err)
            } else {
                
                navigate(`/store/products/ProductList`, {replace:true})
            }

        } catch (error) {
            console.log(error);
            showBoundary(error)
        }


    }

    return (
        <div className="login-container">
            <div className="as-buyer">
                <NavLink replace to={'/BuyerLogin'}>
                    <button>#Buyer</button>
                </NavLink>
            </div>
            <KaryanaNameWithTitle />
            <div className="lgn-inputs-cont">
                <input
                    type="text"
                    placeholder="Email Adress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="lgn-buttons-cont">

                    <button onClick={Login}>Login</button>
                    <NavLink to='/CreateAccount' replace={true} ><button>OR CreateStore</button></NavLink>
                </div>

                <h2>{userNotFound}</h2>

            </div>

        </div>


    );
}

export default LoginComp;