import React,{useRef} from 'react';
import { useHistory } from 'react-router';
import { insertAuction } from '../../../DataAPIManagerTool/NackowskisService';
import AuctionObject from "./AuctionClass"


const AddAuction = () => {
    
    const history = useHistory();
    //Creates a new instance of an AuctionObject
    let auction = new AuctionObject();

    auction.AuctionID = 0
    auction.Titel = useRef();
    auction.Description = useRef()
    auction.StartDate = useRef()
    auction.EndDate = useRef()
    auction.GroupCode = 2310
    auction.OpeningPrice = useRef()
    auction.CreatedBy = useRef()

    const addAuction = () => {
        insertAuction(auction)
        //console.log("Simulate upload.")
    }
    const backToHome = () => {
        history.push("/");
    }

    //Writes up the "form"
    return ( <div className="new-auction">
    <input classname="input-field" type="text" ref={auction.Titel} />
    <input classname="input-field" type="text" ref={auction.Description} />
    <input classname="input-field" type="date" ref={auction.StartDate} />
    <input classname="input-field" type="date" ref={auction.EndDate} />
    <input classname="input-field" type="text" ref={auction.OpeningPrice} />
    <input classname="input-field" type="text" ref={auction.CreatedBy} />
    <button clasname="btn grey" onClick={() => {addAuction(); backToHome();}}>Ladda upp</button>

    </div> );
}
 
export default AddAuction;