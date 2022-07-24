import React from 'react';
import {useNavigate} from "react-router-dom";
import {IAirport} from "../../models";
import classes from './AirportCard.module.css';

interface AirportCardProps {
   airport: IAirport;
}

function AirportCard({ airport }: AirportCardProps) {
   const navigate = useNavigate();

   const clickHandler = () => {
      navigate(`/airport/${airport.id}`);
   }

   return (
      <div onClick={clickHandler} className={classes.card}>
         {airport.name}
      </div>
   )
}

export default AirportCard;