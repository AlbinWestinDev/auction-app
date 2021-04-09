//Malin
import React from 'react';
import '../../style/css/style.css';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const AuctionItem = ({ auction }) => {

  let d = dayjs(auction.SlutDatum);
  console.log(d.format("DD-MM-YYYY"));

  return (
  
  <Link style={{textDecoration:'none', color:'black'}}
    to={{
      pathname: `/Auktion/2310/${auction.AuktionID}`,
      auctionObj: auction
    }}>

    <div className="a-comp-holder">
      <div className="a-comp-card card">
        <div className="a-card-container">
          <h3 className='headerFont'>{auction.Titel}</h3>

          <p>Utropspris: {auction.Utropspris} kr</p>
          
          <p>Slutdatum: <br/>
          {d.format("DD-MM-YYYY")}</p>

        </div>
      </div>
    </div>
    </Link>
  );
};

export default AuctionItem;
