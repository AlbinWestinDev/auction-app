import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getAll } from '../../../DataAPIManagerTool/NackowskisService';
import '../../../style/css/style.css';
import AuctionListItem from '../AuctionListItem';

const SearchAuction = () => {
  let { searchTerm } = useParams();
  const [auctions, setAuctions] = useState();

  const getAuctions = async () => {
    const result = await getAll();

    setAuctions(
      result.filter((auc) =>
        auc.Titel.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getAuctions();
  }, []);

  useEffect(() => {
    getAuctions();
  }, [searchTerm]);

  return (
    <>
      <div className="container backgroundGradient">
        <div className="a-list-grid">
          {auctions?.map((auction) => (
            <AuctionListItem key={auction.AuktionID} auction={auction} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchAuction;
