import { lazy, Suspense, useEffect } from 'react';

import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { localStorageTypes } from './axios/axiosApi';

const CreateAccount = lazy(() => import('./authentication/storeAuth/createAccount'))
const LoginComp = lazy(() => import('./authentication/storeAuth/login'));
const Store = lazy(() => import('./componants/store/Store'));

const BuyerCreateAccount = lazy(() => import('./authentication/buyerAuth/BuyerCreateAccount'))
const BuyerLogin = lazy(() => import('./authentication/buyerAuth/BuyerLogin'));
const BuyerHomeRoutes = lazy(() => import('./routes/buyer/BuyerHomeRoutes'));



function App() {
  let { pathname } = useLocation()
  let navigate = useNavigate()
  let localStrg: any = localStorage.getItem('accessToken');
  let strg: localStorageTypes = localStrg ? JSON.parse(localStrg) : null
  let bool = (pathname === '/BuyerLogin' || pathname === '/BuyerCreateAccount' || pathname === '/' || pathname == '/CreateAccount') && strg;
  useEffect(() => {

    if ((pathname === '/' || pathname == '/CreateAccount') && strg?.buyerOrStore == 'store') {
      
      navigate("/store/products/ProductList", { replace: true })
      
    }
    
    else if ((pathname === '/BuyerLogin' || pathname === '/BuyerCreateAccount' || pathname === '/') && strg?.buyerOrStore == 'buyer') {
      console.log('sadlfksdf');
      navigate("/Buyer/Purchases", { replace: true })
    }
   

  }, [])

return (
    <div>
      <Suspense fallback={<h1>loading...</h1>}>
        <Routes>
            <Route  path="/" element={<LoginComp />} />
            <Route path='/CreateAccount' element={<CreateAccount />} />
            <Route path='/store/*' element={<Store />} />

            <Route path='/BuyerLogin' element={<BuyerLogin />} />
            <Route path='/BuyerCreateAccount' element={<BuyerCreateAccount />} />
             <Route path='*' element={<BuyerHomeRoutes />} />

        </Routes>


      </Suspense>
    </div>
  );
}



export default App;
