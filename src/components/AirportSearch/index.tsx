import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"

import axios from "../../axios";
import {useInput} from "../../hooks/useInput";
import {useDebounce} from "../../hooks/useDebounce";
import {IAirport, ServerResponse} from "../../models";

function AirportSearch() {
   const input = useInput();
   const navigate = useNavigate();
   const debounced = useDebounce<string>(input.value);
   const [dropdown, setDropdown] = useState(false);
   const [searchedAirports, setSearchedAirports] = useState<IAirport[]>([]);

   const searchAirports = async () => {
      try {
         const response = await axios.get<ServerResponse<IAirport>>('airports', {
            params: {
               search: debounced,
               count: 10
            }
         });

         setSearchedAirports(response.data.results);
      } catch (e) {
         console.log(e);
      }
   }

   useEffect(() => {
      if (debounced.length > 3) {
         searchAirports().then(() => setDropdown(true));
      } else {
         setDropdown(false);
      }
   }, [searchAirports, debounced]);

   return (
      <div className='position-relative mb-3'>
         <input
            className='form-control form-control-lg'
            placeholder='Type something here...'
            type="text"
            { ...input }
         />

         { dropdown && <div className='position-absolute top-100 left-0 w-100'>
             <ul className='list-unstyled p-4 bg-success'>
                { searchedAirports.map(airport => (
                   <li onClick={() => navigate(`/airport/${airport.id}`)} className='p-3 mb-3' key={airport.id}>
                      {airport.name}
                   </li>
                ))}
             </ul>
         </div>}
      </div>
   )
}

export default AirportSearch;