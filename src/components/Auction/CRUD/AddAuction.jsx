import React,{useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { insertAuction } from '../../../DataAPIManagerTool/NackowskisService';
import AuctionObject from "./AuctionClass"


const AddAuction = () => {
    //Creates a new instance of an AuctionObject
    
    const title = useRef("");
    const description = useRef("");
    const startdate = useRef(null);
    const enddate = useRef(null);
    const openingPrice = useRef("");
    const owner = useRef("");
    let [errormsg, setErrorMsg] = useState("");
    
    

    const addAuction = () => {
        let auction = new AuctionObject(title.current.value, 
            description.current.value, startdate.current.value, 
            enddate.current.value, openingPrice.current.value, 
            owner.current.value);
        
        insertAuction(auction);
        //console.log("Simulate upload.")
    }
    const numberValidation =(e) => {
        if(!Number(e.target.value)){
            setErrorMsg("Ditt pris måste vara ett tal");
        }else{
            setErrorMsg("")
        }
    }
    const submitHandler = (e) =>{
        e.preventDefault();


    }
    
    //Writes up the "form"
    return ( <div className="new-auction">

    <form className="auction-form" name="auction-form" onSubmit={submitHandler}>
    <label htmlFor="titel">Titel</label>
    <input id="titel" classname="input-field" type="text" ref={title} placeholder="Titel:"/>
    <label htmlFor="description">Beskrivning</label>
    <textarea id="description" classname="input-field" type="" ref={description} placeholder="Beskrivning:"/>
    <label htmlFor="startDate">Startdatum</label>
    <input id="startDate" classname="input-field" type="date" ref={startdate} />
    <label htmlFor="endDate">Slutdatum</label>
    <input id="endDate" classname="input-field" type="date" ref={enddate} />
    <label htmlFor="price">Öppningsbud</label>
    <input id="price" classname="input-field" type="text" ref={openingPrice} onChange={numberValidation}/>
    <label htmlFor="createdBy">Ägare</label>
    <input id="createdBy" classname="input-field" type="text" ref={owner} />
    <p>{errormsg}</p>
    <button type="submit" className="btn grey" onClick={() => {addAuction();}}>Ladda upp</button>
    </form>
    </div> );
}
 
export default AddAuction;