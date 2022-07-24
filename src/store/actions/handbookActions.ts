import axios from "../../axios";
import {AppDispatch} from "../index";
import {fetchError, fetching, fetchSuccess} from "../slices/handbookSlice";
import {IAirportCountry, IAirportRegion, IAirportType} from "../../models";

export const fetchHandbooks = () => {
   return async (dispatch: AppDispatch) => {
      try {
         dispatch(fetching());

         const response = await Promise.all([
            axios.get<IAirportType[]>('handbook/airport-types'),
            axios.get<IAirportRegion[]>('handbook/regions'),
            axios.get<IAirportCountry[]>('handbook/countries'),
         ]);

         dispatch(fetchSuccess({
            types: response[0].data,
            regions: response[1].data,
            countries: response[2].data
         }));
      } catch (e) {
         dispatch(fetchError(e as Error));
      }
   }
}