//Malin

import React, { useState, useEffect } from 'react';
import {
  getAll,
  getUnexpiredAuctions,
} from '../../DataAPIManagerTool/NackowskisService';
import AuctionListItem from './AuctionListItem';
import './AuctionListStyle.css';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    getUnexpiredAuctions().then((t) => setAuctions(t));
    //För att se alla auktioner:
    // getAll().then(t => setAuctions(t));
  }, []);

  console.log(auctions);

  return (
    <div className="container">
      <div className="a-list-grid">
        {auctions.map((auction) => (
          <AuctionListItem key={auction.AuktionID} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
