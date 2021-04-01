import axios from "axios";

const BASE_URL = "http://nackowskis.azurewebsites.net/api";
const AUCTION_GROUP_ID = 2310;

//Returnerar en array med alla objekt
export const getAll = () => {
  const url = `${BASE_URL}/Auktion/${AUCTION_GROUP_ID}`;
  return axios.get(url).then((response) => response.data);
};

//Returnerar ett objekt
export const getById = (id) => {
  const url = `${BASE_URL}/Auktion/${AUCTION_GROUP_ID}/${id}`;
  return axios.get(url).then((response) => response.data);
};

//Returnerar alltid en array. Om ingen träff är arrayen tom.
export const getByTitle = async (title) => {
  const allAuctions = await getAll();

  return allAuctions.filter((auc) => {
    return auc.Titel.toLowerCase().includes(title.toLowerCase());
  });
};

// Tar emot ett auktionsobjekt och postar.
export const insertAuction = (obj) => {
  const url = `${BASE_URL}/Auktion/${AUCTION_GROUP_ID}`;
  axios.post(url, obj);
};

// Tar emot ett budobjekt och postar.
export const insertBid = (obj) => {
  const url = `${BASE_URL}/Auktion/${AUCTION_GROUP_ID}`;
  axios.post(url, obj);
};

//Tar emot ett komplett auktionsobjekt, kollar på AuktionId och byter ut motsvarande objekt i databasen.
export const updateAuction = (obj) => {
  const url = `${BASE_URL}/Auktion/${AUCTION_GROUP_ID}/${obj.AuktionID}`;

  axios.put(url, obj).then((response) => console.log(response.status));
};
