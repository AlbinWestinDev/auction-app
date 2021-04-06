class AuctionObject {
  constructor(
    auctionId,
    titel,
    description,
    startDate,
    endDate,
    openingPrice,
    createdBy
  ) {
    this.AuctionID = auctionId;
    this.Titel = titel;
    this.Description = description;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.OpeningPrice = openingPrice;
    this.CreatedBy = createdBy;
  }
}

export default AuctionObject;
