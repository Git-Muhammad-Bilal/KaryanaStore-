import { useEffect, useState } from 'react';
import axiosApi from '../axios/axiosApi';
import { NavLink, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';


const LogOutComp = () => {


    let { pathname } = useLocation()
    const { showBoundary } = useErrorBoundary()
    let userId = useParams()
    
    const logout = async () => {

        try {
            await axiosApi.post('/logout',
                { id: userId.id, }
            )
            localStorage.removeItem('accessToken');
        } catch (error) {
            showBoundary(error)
        }
    }
    return (
        <div className='logout-Container'>

            <NavLink replace to={pathname.includes('/Buyer') ? '/BuyerLogin' : "/"}  >
                <button onClick={logout}>Logout</button>
            </NavLink>
            <div >
            </div>

        </div>
    );
}

export default LogOutComp