import React from 'react';
import Professionals from './Professionals';

function MortgageProfessionals({professionals, emptyData}) {
  
  return (
    <section className="mortgageProfessionals">
        <div className="container">
            <div className="sectionHead">
                <h2>Mortgage Professionals</h2>
                <p>We know the best solution for the businesses are the one which is suited to their needs with<br/> dedicated attention </p>
            </div>

            {emptyData ? <h4 className="error center nocontent">No Results Found</h4> : ''}
            {professionals && !emptyData &&  <Professionals professionals={professionals}/>}
        </div>
    </section>
  );
}

export default MortgageProfessionals;
