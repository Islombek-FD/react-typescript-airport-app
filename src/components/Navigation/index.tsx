import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {logout} from "../../store/slices/authSlice";

function Navigation() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector(state => state.auth);

   const logoutHandler = () => {
      dispatch(logout());

      navigate('/auth');
   }

   return (
      <header className='py-3 bg-success shadow-sm'>
         <div className="container">
            <div className='d-flex justify-content-between align-items-center'>
               <span className='fs-4 text-white'>Airport</span>

               <ul className='d-flex gap-5 list-unstyled mb-0'>
                  <li>
                     <NavLink className='text-white' to='/airport'>Main</NavLink>
                  </li>

                  { !isAuth ?
                      <li>
                          <NavLink className='text-white' to='/auth'>Auth</NavLink>
                      </li> :
                     <li>
                        <span onClick={logoutHandler}>Logout</span>
                     </li>
                  }
               </ul>
            </div>
         </div>
      </header>
   )
}

export default Navigation;