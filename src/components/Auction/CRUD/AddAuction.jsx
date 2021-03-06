import React,{useRef} from 'react';
import { useHistory } from 'react-router';
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
    let err = "";
    
    

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
            err="Ditt pris måste vara ett tal";
        }else{
            err =""
        }
    }
    const submitHandler = (e) =>{
        e.preventDefault();


    }
    
    //Writes up the "form"
    return ( 
    <div className='container backgroundGradient'>
        <div className="new-auction card">
        <h2 className='h1-h'>Skapa ny auktion</h2>
            <form className="auction-form" name="auction-form" onSubmit={submitHandler}>
            
            <label htmlFor="titel" className='label'>Titel</label>
            <input id="titel" classname="input-field" type="text" ref={title} />
            
            <label htmlFor="startDate" className='label'>Startdatum</label>
            <input id="startDate" classname="input-field" type="date" ref={startdate} />
            
            <label htmlFor="endDate" className='label'>Slutdatum</label>
            <input id="endDate" classname="input-field" type="date" ref={enddate} />
            
            <label htmlFor="price" className='label'>Öppningsbud</label>
            <input id="price" classname="input-field" type="text" pattern="[0-9]" ref={openingPrice} onChange={numberValidation}/>

            <label htmlFor="description" className='label'>Beskrivning</label>
            <textarea id="description" classname="input-field-text" type="" ref={description} />
            
            <label htmlFor="createdBy" className='label'className='label'>Ägare</label>
            <input id="createdBy" classname="input-field" type="text" ref={owner} />
            <p>{err}</p>
            <Link to="/" className="btn submit" onClick={() => {addAuction();}}>Ladda upp</Link>
            
            </form>
    </div></div> );
}
 
export default AddAuction;