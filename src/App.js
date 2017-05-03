import React, { Component } from "react";
import MLSData from "react-mlsdata";
import { authtoken } from "./_config.js";

class Values extends Component {
  render() {
    console.log(this.props.data);

    return <div />;
  }
}

class Listings extends Component {
  render() {
    const { listings } = this.props;

    var listingCollection = listings.map(listing => (
      <div className="box" key={Math.floor(Math.random() * Date.now()) + 1}>
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong className="mr2 inline-block">{listing.ListingId}</strong>
                <small className="mr2 inline-block">{listing.ListPrice}</small>
                <small>{listing.StandardStatus}</small>
              </p>
              <p>{listing.PublicRemarks}</p>
            </div>
          </div>
        </article>
      </div>
    ));

    return <div>{listingCollection}</div>;
  }
}

class Count extends Component {
  render() {
    return (
      <h3>
        <strong>
          {this.props.data.length} Listings Retrieved v0.1.2
        </strong>
      </h3>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Auth token from https://identity.mlslistings.com/Openid/connect/token
   const query = { filter: { ListOfficeKeyNumeric: 101625 } };
    return (
      <div className="container mt2">
        <MLSData collection="Property" token={authtoken} query={query}>
          {({ loading, error, data }) => (
            <div>

              {loading &&
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="center">
                      <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
                      {" "}
                      Loading...
                    </h3>
                  </div>
                </div>}

              {error &&
                <div className="columns">
                  <div className="column is-12">
                    <div className="notification is-danger">
                      The data fetch failed please check your authorization token and try again.
                    </div>
                  </div>
                </div>}

              {data &&
                <div className="container">

                  <Values data={data} />

                  <div className="columns">

                    <div className="column is-12">
                      <div className="notification">
                        <Count data={data.value} />
                      </div>
                    </div>

                  </div>

                  <div className="columns">
                    <div className="column is-12">
                      <Listings listings={data.value} />
                    </div>
                  </div>

                </div>}

            </div>
          )}

        </MLSData>
      </div>
    );
  }
}
export default App;