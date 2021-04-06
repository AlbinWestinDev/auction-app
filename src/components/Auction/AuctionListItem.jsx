//Malin
import React from 'react';
import './AuctionListStyle.css';
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
      <div className="a-comp-card">
        <div className="a-card-container">
          <h4>{auction.Titel}</h4>

          <p>Utropspris: {auction.Utropspris} kr</p>
          
          <p>Slutdatum: <br/>
          {d.format("DD-MM-YYYY")} <br/>
          {d.format("HH:ss")}</p>

        </div>
      </div>
    </div>
    </Link>
  );
};

export default AuctionItem;
