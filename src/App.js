import React, { Component } from "react";
import SearchForm from "./components/SearchForm/index";
import ResultList from "./components/ResultList/index";
import MapBox from "./components/MapBox/MapBox";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    ofns_desc: [],
    sel_ofns: "",
    offet: 0,
    limit: 100,
    results: [],
    filtered: [],
  };

  componentDidMount() {
    this.searchArrestType();
  }

  searchArrestType = async () => {
    try {
      const res = await axios.get(
        "https://data.cityofnewyork.us/resource/8h9b-rp9u.json?$group=ofns_desc&$select=ofns_desc"
      );
      this.setState({
        ofns_desc: res.data.map((x) => x.ofns_desc),
      });
    } catch (error) {
      console.log(error);
    }
  };

  advanceOffset = (val) => {
    if (val) {
      this.setState(
        {
          offet: this.state.offet + this.state.limit,
        },
        this.searchArrests
      );
    } else if (this.state.offet - this.state.limit >= 0) {
      this.setState(
        {
          offet: this.state.offet - this.state.limit,
        },
        this.searchArrests
      );
    }
  };

  searchArrests = async () => {
    const res = await axios.get(
      `https://data.cityofnewyork.us/resource/8h9b-rp9u.json?$limit=${this.state.limit}&$offset=${this.state.offet}`,
      {
        params: {
          $order: "arrest_date DESC",
          ofns_desc: this.state.sel_ofns,
        },
      }
    );
    this.setState({
      filtered: res.data,
    });
  };

  handleInputChange = (event) => {
    this.setState(
      {
        sel_ofns: event.target.value,
      },
      this.searchArrests
    );
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand mb-0 h1 text-white pt-1">
            NYC Historic Arrest Data Visualization
          </span>
        </nav>
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-4">
              <SearchForm
                results={this.state.ofns_desc}
                handleInputChange={this.handleInputChange}
              />
              <div className="alert alert-danger" role="alert">
                Number of Arrests: {this.state.filtered.length}
              </div>

              <p>
                NYC Historic Arrest Data Visualization is a dashboard that
                displays every arrest effected in NYC by the NYPD going back to
                2006 through 2018. Users can select an arrest type from the
                drop-down list; the location of each arrest will then be
                displayed on the map with their arrest date. Meanwhile, the
                aggregate number of arrests in each borough will be displayed on
                one bar chart, with the number of arrestees in each age range
                displayed on another bar chart. At the bottom, a line graph is
                used to show the number of arrests over time.
              </p>

              <p>
                Data Source:{" "}
                <a
                  href="https://data.cityofnewyork.us/Public-Safety/NYPD-Arrests-Data-Historic-/8h9b-rp9u"
                  aria-label="NYCOpenData"
                  title="NYCOpenData"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NYC OpenData
                </a>
              </p>
            </div>
            <div className="col-md-8">
              <div className="card">
                <MapBox results={this.state.filtered} />
              </div>
            </div>

            <div className="col-md-12">
              <ResultList results={this.state.filtered} />
            </div>

            <div className="col-md-12 text-center mb-2">
            <button className="btn btn-outline-dark mr-1" onClick={() => this.advanceOffset(true)}>Prev</button>
              <button className="btn btn-outline-dark ml-1" onClick={() => this.advanceOffset(false)}>Next</button>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default App;
