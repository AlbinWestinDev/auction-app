import axios from 'axios';

const BASE_URL = 'http://nackowskis.azurewebsites.net/api';
const GROUP_ID = 2310;

//Returnerar en array med alla objekt
export const getAll = () => {
  const url = `${BASE_URL}/Auktion/${GROUP_ID}`;
  return axios.get(url).then((response) => response.data);
};

//Returnerar ett objekt
export const getById = (id) => {
  const url = `${BASE_URL}/Auktion/${GROUP_ID}/${id}`;
  return axios.get(url).then((response) => response.data);
};

//Returnerar alltid en array. Om ingen träff är arrayen tom.
export const getByTitle = async (title) => {
  const allAuctions = await getAll();

  return allAuctions.filter((auc) => {
    return auc.Titel.toLowerCase().includes(title.toLowerCase());
  });
};

//Returnerar en lista med aktuella auktioner (där slutdatum ej gått ut)
export const getUnexpiredAuctions = async () => {
  const allAuctions = await getAll();
  return allAuctions.filter((auc) => {
    return new Date(auc.SlutDatum) > new Date();
  });
};

// Tar emot ett auktionsobjekt och postar.
export const insertAuction = (obj) => {
  const url = `${BASE_URL}/Auktion/${GROUP_ID}`;
  return axios.post(url, obj).then((response) => response.data);
};

// Tar emot ett budobjekt och postar.
export const insertBid = (obj) => {
  const url = `${BASE_URL}/Bud/${GROUP_ID}`;
  axios.post(url, obj);
};

//Tar emot ett komplett auktionsobjekt, kollar på AuktionId och byter ut motsvarande objekt i databasen.
export const updateAuction = (obj) => {
  const url = `${BASE_URL}/Auktion/${GROUP_ID}/${obj.AuktionID}`;

  return axios.put(url, obj).then((response) => {
    console.log('axios put', response);
  });
};

export const deleteById = (id) => {
  const url = `${BASE_URL}/Auktion/${GROUP_ID}/${id}`;

  axios.delete(url);
};

export const getBidByAuctionId = (id) => {
  const url = `${BASE_URL}/Bud/${GROUP_ID}/${id}`;
  return axios.get(url).then((response) => response.data);
};
