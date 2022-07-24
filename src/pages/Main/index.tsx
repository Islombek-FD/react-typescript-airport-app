import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";

import AirportSearch from "../../components/AirportSearch";
import AirportFilter from "../../components/AirportFilter";
import AirportCard from "../../components/AirportCard";
import {fetchAirports} from "../../store/actions/airportActions";

const ITEMS_PER_PAGE = 50;

function Main() {
   const dispatch = useAppDispatch();
   const [page, setPage] = useState(0);
   const { loading, error, airports, count } = useAppSelector(state => state.airport);

   const pageCount = Math.ceil( count / ITEMS_PER_PAGE );

   const changePageHandler = ({ selected }: { selected: number }) => {
      setPage(selected);
   }

   useEffect(() => {
      dispatch(fetchAirports(page + 1, ITEMS_PER_PAGE));
   }, [dispatch, page]);

   return (
      <div className='container my-5'>
         <AirportSearch />

         <AirportFilter />

         { loading && <p className='text-primary fs-3'>Loading....</p> }
         { error && <p className='text-danger fs-3'>{error}</p> }

         { !loading && !error &&
            airports.map(airport => <AirportCard key={airport.id} airport={airport} />)
         }

         <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={changePageHandler}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            forcePage={page}
            previousLabel="<"
            containerClassName='d-flex align-items-center gap-3 list-unstyled'
            previousClassName='py-1 px-3 bg-primary text-white'
            nextClassName='py-1 px-3 bg-primary text-white'
            activeClassName='py-1 px-3 bg-success text-white'
         />
      </div>
   )
}

export default Main;