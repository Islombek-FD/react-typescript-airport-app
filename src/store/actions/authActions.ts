import {AppDispatch} from "../index";
import axios from "../../axios";
import {login} from "../slices/authSlice";

interface AuthResponse {
   access: string;
   refresh: string;
}

interface AuthData {
   username: string;
   password: string;
}

export const register = (data: AuthData) => {
   return async (dispatch: AppDispatch) => {
      try {
         const response = await axios.post<AuthResponse>('auth/register', data);

         dispatch(login({
            username: data.username,
            access: response.data.access
         }));
      } catch (e) {
         throw e as Error;
      }
   }
}