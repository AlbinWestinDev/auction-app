import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

import {
  getById,
  updateAuction,
} from "../DataAPIManagerTool/NackowskisService";

class EditAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      titel: "",
      beskrivning: "",
      slutdatum: "",
      auction: "",
      auctionId: props.match.params.id,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchAuctionData(this.state.auctionId);
  }

  fetchAuctionData = async (id) => {
    const fetchedAuction = await getById(id);

    this.setState({ auction: fetchedAuction });

    this.setState({ titel: fetchedAuction.Titel });

    this.setState({ beskrivning: fetchedAuction.Beskrivning });

    this.setState({ slutdatum: fetchedAuction.SlutDatum });

    console.log(fetchedAuction);
  };

  updateAuctionData = async (obj) => {
    await updateAuction(obj);

    this.forceUpdate();
  };

  handleChange(event) {
    console.log(event);

    if (event.target.name == "titel") {
      this.setState({ titel: event.target.value });
    }
    if (event.target.name == "beskrivning") {
      this.setState({ beskrivning: event.target.value });
    }
    if (event.target.name == "slutdatum") {
      this.setState({ slutdatum: event.target.value });
    }
  }

  handleSubmit(event) {
    var updatedAuction = this.state.auction;

    updatedAuction.Titel = this.state.titel;

    updatedAuction.Beskrivning = this.state.beskrivning;

    updatedAuction.SlutDatum = this.state.slutdatum;

    updateAuction(updatedAuction);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <Link className="btn btn-primary" to="/">
          Back
        </Link>
        <h1>Redigera Auktion</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Titel:
              <input
                name="titel"
                type="text"
                value={this.state.titel}
                onChange={this.handleChange}
              />
            </label>

            <label>
              Beskrivning:
              <input
                name="beskrivning"
                type="text"
                value={this.state.beskrivning}
                onChange={this.handleChange}
              />
            </label>
            <label>
              SlutDatum:
              <input
                name="slutdatum"
                type="text"
                value={this.state.slutdatum}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default EditAuction;
