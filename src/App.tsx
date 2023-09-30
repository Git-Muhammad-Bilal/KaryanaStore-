import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import FallbackRender from "./GloalErrorsHanlder/FallackReader";
import UserRoutes from "./routes/storeRoutes/userRoutes";
import BuyerRoutes from "./routes/buyer/BuyerRoutes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={FallbackRender}
        onReset={():void => {console.log('reset the page') }}
        >
          <UserRoutes />
          <BuyerRoutes/>
      </ErrorBoundary>

        </BrowserRouter>
    </div>
  );
}

export default App;
