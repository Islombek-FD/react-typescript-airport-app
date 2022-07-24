import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import axios from "../../axios";
import {IAirportDetail} from "../../models";

function AirportDetail() {
   const { id } = useParams<{ id: string }>();
   const [loading, setLoading] = useState(true);
   const [airport, setAirport] = useState<IAirportDetail | null>(null);

   const fetchDetailAirport = async () => {
      try {
         const response = await axios.get<IAirportDetail>(`/airports/${id}`);

         setAirport(response.data);
      } catch (e) {
         console.log(e);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchDetailAirport();
   }, [fetchDetailAirport]);

   if (loading) {
      return (
         <div className='text-center py-5'>
            <span className='text-primary'>Loading.....</span>
         </div>
      )
   }

   return (
      <div className='container'>
         <div className='p-4 shadow-1 border border-2 rounded'>
            <h2>Airport name {airport?.name}</h2>
            <p>Airport country {airport?.country}</p>
            <p>Airport coordinates {airport?.coordinates}</p>
            <p>Airport region {airport?.region}</p>
         </div>
      </div>
   )
}

export default AirportDetail;