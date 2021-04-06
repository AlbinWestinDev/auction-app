import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      endDate: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getAuctionDetails();
  }

  getAuctionDetails() {
    const auctionId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/api/Auktion/${auctionId}`)
      .then((response) => {
        this.setState(
          {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            endDate: response.data.endDate,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((err) => console.log(err));
  }

  editAuction(newAuction) {
    axios
      .request({
        method: "put",
        url: `http://localhost:3000/api/Auktion/${this.state.id}`,
        data: newAuction,
      })
      .then((response) => {
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  }

  onSubmit(e) {
    const newAuction = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      endDate: this.refs.price.value,
    };
    this.editAuction(newAuction);
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const title = target.title;

    this.setState({
      [title]: value,
    });
  }

  render() {
    return (
      <div>
        <br />
        <Link className="btn grey" to="/">
          Back
        </Link>
        <h1>Edit Meetup</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              type="text"
              name="title"
              ref="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <label htmlFor="title">Titel</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="description"
              ref="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            <label htmlFor="description">Beskrivning</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="endDate"
              ref="endDate"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
            <label htmlFor="address">Slut datum</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    );
  }
}

export default EditAuction;
