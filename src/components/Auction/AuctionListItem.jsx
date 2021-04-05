//Malin
import React from 'react';
import './AuctionListStyle.css';
import { Link } from 'react-router-dom';

const AuctionItem = ({auction}) => {

    // const startDate = () => {
    //     var d = new Date(auction.StartDatum),
    //     month = '' + (d.getMonth() + 1),
    //     day = '' + d.getDay(),
    //     year = '' + d.getFullYear();

    //     if (month.length < 2)
    //         month = '0' + month;
    //     if (day.length < 2)
    //         day = '0' + day;

    //     return [year, month, day].join('-');
    // };

    const endDate = () => {
        var d = new Date(auction.SlutDatum),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDay(),
        year = '' + d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    };

    return (
        <div className='a-comp-holder'>
        <div className='a-comp-card'>
            <div className='a-card-container'>
            <h4>{auction.Titel}</h4>

            <p>Utropspris: {auction.Utropspris} kr</p>
            
            <p>Slutdatum: {endDate()}</p>
                       
            <Link to={`/Auktion/2310/${auction.AuktionID}`}>Se Mer</Link>
            </div>
        </div>
        </div>
    )
};


export default AuctionItem