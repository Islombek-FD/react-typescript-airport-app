import React, {ChangeEvent, useEffect, useState} from 'react';

import {IFilter} from "../../models";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import { filterAirports } from '../../store/slices/airportSlice';

function AirportFilter() {
   const dispatch = useAppDispatch();
   const [hasFilter, setHasFilter] = useState(false);
   const [filter, setFilter] = useState<IFilter>({ type: '', region: '', country: '' });
   const { loading, types, regions, countries } = useAppSelector(state => state.handbook);

   const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }));
   }

   const clearFilter = () => {
      setFilter({ type: '', region: '', country: '' });
   }

   useEffect(() => {
      if (filter.type || filter.region || filter.country) {
         setHasFilter(true);
      } else {
         setHasFilter(false);
      }

      dispatch(filterAirports(filter));
   }, [dispatch, filter]);

   if (loading) {
      return (
         <div className='py-5 text-center'>
            <span>Loading.....</span>
         </div>
      )
   }

   return (
      <div className='p-4 mb-3 border'>
         <h2>Filter</h2>

         <div className='d-flex gap-3'>
            <select onChange={changeHandler} value={filter.type} className='form-select' name="type">
               <option value="" disabled>Type</option>
               { types.map(type => (
                  <option value={type} key={type}>{type}</option>
               ))}
            </select>

            <select onChange={changeHandler} value={filter.region} className='form-select' name="region">
               <option value="" disabled>Region</option>
               { regions.map(region => (
                  <option value={region} key={region}>{region}</option>
               ))}
            </select>

            <select onChange={changeHandler} value={filter.country} className='form-select' name="country">
               <option value="" disabled>Country</option>
               { countries.map(country => (
                  <option value={country} key={country}>{country}</option>
               ))}
            </select>

            { hasFilter && <button onClick={clearFilter} className="btn btn-danger">Clear</button> }
         </div>
      </div>
   )
}

export default AirportFilter;