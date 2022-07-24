import React, {FormEvent} from 'react';
import {useNavigate} from "react-router-dom";

import {useInput} from "../../hooks/useInput";
import {useAppDispatch} from "../../hooks/useRedux";
import {register} from "../../store/actions/authActions";

function Auth() {
   const username = useInput();
   const password = useInput();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const isFormValid = () => username.value && password.value;

   const submitHandler = async (e: FormEvent) => {
      e.preventDefault();

      if (isFormValid()) {
         await dispatch(register({username: username.value, password: password.value}));
         navigate('/');
      } else {
         alert('INVALID FORM PLZ CHANGE');
      }
   }

   return (
      <div className='container w-50 mt-5 px-5 py-4 shadow'>
         <form onSubmit={submitHandler}>
            <div className="mb-3">
               <label htmlFor="username">Username</label>
               <input className='form-control form-control-lg' type="text" id='username' { ...username } />
            </div>

            <div className="mb-3">
               <label htmlFor="password">Password</label>
               <input className='form-control form-control-lg' type="password" id='password' { ...password } />
            </div>

            <div className='text-end'>
               <button className="btn btn-lg btn-primary" type='submit'>Submit</button>
            </div>
         </form>
      </div>
   )
}

export default Auth;