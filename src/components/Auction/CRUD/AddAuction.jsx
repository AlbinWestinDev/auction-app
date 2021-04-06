import React,{useRef} from 'react';
import { insertAuction } from '../../../DataAPIManagerTool/NackowskisService';
import {AuctionObject} from "./AuctionClass"

const AddAuction = () => {
    
    let auction = new AuctionObject();
    

    
    
    AuctionID : Date.now(),
    Titel = useRef(),
    Description = useRef(),
    StartDate = useRef(),
    EndDate = useRef(),
    //GroupCode = 2310,
    OpeningPrice = useRef(),
    CreatedBy = useRef()

    const addAuction = () => {
        insertAuction(auction)
    }

    return ( <div className="new-auction">
    <input type="text" ref={auction.Titel} />
    <input type="text" ref={auction.Description} />
    <input type="date" ref={auction.StartDate} />
    <input type="date" ref={auction.EndDate} />
    <input type="text" ref={auction.OpeningPrice} />
    <input type="text" ref={auction.CreatedBy} />
    <button onClick={addAuction}>Ladda upp</button>

    </div> );
}
 
export default AddAuction;