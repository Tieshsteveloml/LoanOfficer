import React from 'react';

import icon_star_blank from '../images/icon_star_blank.svg';
import icon_star_filled from '../images/icon_star_filled.svg';


const MAX_RATING = 5;

function Ratings({editable = false, rating = 0}) {

    const roundRating = Math.round(rating/2);
    let fillIcons = 0;
    let blankIcons = 0;
    
    if(roundRating>=MAX_RATING){
        fillIcons = MAX_RATING;
        blankIcons = 0;
    }else{
        fillIcons = roundRating;
        blankIcons = MAX_RATING-roundRating;
    }

   

  return (
      
    <div className="rating-wrap dflx">
        
    {editable && <span className="rating-numb">{rating}</span> }
    <ul className="dflx">
        {Array.from(Array(fillIcons), (e, i) => {
            return <li key={i}><img src={icon_star_filled} alt={i}/></li>
        })}
         {Array.from(Array(blankIcons), (e, i) => {
            return <li key={i}><img src={icon_star_blank} alt={i}/></li>
        })}
    </ul>
    </div>
  );
}

export default Ratings;
