import React, {useEffect} from 'react';
import Navigation from "./components/Navigation";
import {Navigate, Route, Routes} from "react-router-dom";

import Main from "./pages/Main";
import AirportDetail from "./pages/AirportDetail";
import Auth from "./pages/Auth";
import {useAppDispatch} from "./hooks/useRedux";
import {fetchHandbooks} from "./store/actions/handbookActions";

function App() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchHandbooks());
   }, [dispatch]);

   return (
      <div>
         <Navigation/>

         <Routes>
            <Route path='/airport' element={<Main />} />

            <Route path='/airport/:id' element={<AirportDetail />} />

            <Route path='/auth' element={<Auth />} />

            <Route path='/' element={<Navigate to='/airport' />} />
         </Routes>
      </div>
   );
}

export default App;
