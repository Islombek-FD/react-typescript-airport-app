import axios from "../../axios";
import {AppDispatch} from "../index";
import {IAirport, ServerResponse} from "../../models";
import {fetchError, fetching, fetchSuccess} from "../slices/airportSlice";

export const fetchAirports = (page = 1, count = 50) => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(fetching());
         const response = await axios.get<ServerResponse<IAirport>>('airports', {
            params: { page, count }
         });
         dispatch(fetchSuccess({
            airports: response.data.results,
            count: response.data.count
         }));
      } catch (e) {
         dispatch(fetchError(e as Error));
      }
   }
}