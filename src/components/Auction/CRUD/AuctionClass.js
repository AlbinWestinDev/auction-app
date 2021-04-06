class AuctionObject {
  constructor(titel, description, startDate, endDate, openingPrice, createdBy) {
    this.AuktionID = null;
    this.Titel = titel;
    this.Beskrivning = description;
    this.StartDatum = startDate;
    this.SlutDatum = endDate;
    this.Gruppkod = "2310";
    this.Utropspris = openingPrice;
    this.SkapadAv = createdBy;
  }
}

export default AuctionObject;
