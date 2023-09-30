import React, { useState } from 'react';
import axiosApi from '../axios/axiosApi';
import { NavLink, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { log } from 'console';


const LogOutComp = () => {

    const { showBoundary } = useErrorBoundary()
    let userId = useParams()
    const logout = async () => {
        console.log('asdljk;fsadj;klfsdl;jksdfkl;j');
        
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
            <NavLink to="/" >
                <button onClick={logout}>Logout</button>
            </NavLink>

        </div>
    );
}

export default LogOutComp