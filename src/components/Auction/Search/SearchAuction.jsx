import React from 'react';
import { useParams } from 'react-router';

const SearchAuction = () => {
    
    let { searchTerm } = useParams();

    console.log(searchTerm);

    return (
        <>
        </>
        )
}
 
export default SearchAuction;