import {IAirport, IFilter} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AirportState {
   loading: boolean;
   error: string;
   count: number;
   airports: IAirport[];
   airportsCounter: IAirport[];
}

interface AirportPayload {
   airports: IAirport[],
   count: number;
}

const initialState: AirportState = {
   loading: false,
   error: '',
   count: 0,
   airports: [],
   airportsCounter: []
}

const airportSlice = createSlice({
   name: 'airport',
   initialState,
   reducers: {
      fetching(state) {
         state.loading = true;
      },
      fetchSuccess(state, action: PayloadAction<AirportPayload>) {
         state.loading = false;
         state.airports = action.payload.airports;
         state.count = action.payload.count;
         state.error = '';
      },
      fetchError(state, action: PayloadAction<Error>) {
         state.loading = false;
         state.error = action.payload.message;
      },
      filterAirports(state, action: PayloadAction<IFilter>) {
         state.airports = state.airportsCounter
            .filter(airport => airport.type === action.payload.type)
            .filter(airport => airport.region === action.payload.region)
            .filter(airport => airport.country === action.payload.country);
      }
   }
})

export const { fetching, fetchSuccess, fetchError, filterAirports } = airportSlice.actions;
export default airportSlice.reducer;
