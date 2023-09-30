import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react';

const CreateAccount = lazy(() => import('../../authentication/storeAuth/createAccount'))
const LoginComp = lazy(() => import('../../authentication/storeAuth/login'));
const Home = lazy(() => import('../../componants/store/home'));

const UserRoutes = () => {
    
    return (
            <main>
                
                    <Suspense fallback={<h1>loading...</h1>}>
                        <Routes>
                            <Route path='/CreateAccount' element={<CreateAccount />} />
                            <Route path="/" index element={<LoginComp />} />
                            <Route path="/store/*" element={<Home/>} />
                        </Routes>
                    </Suspense>
            </main>
    )
}

export default UserRoutes;