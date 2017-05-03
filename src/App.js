import React, { Component } from "react";
import MLSData, { MLSMedia, MLSCount } from "react-mlsdata";
import { authtoken } from "./_config.js";


class Values extends Component {
  render() {
    console.log(this.props.data);

    return <div />;
  }
}

class Pagination extends Component {
  render() {
    console.log(this.props.data["@odata.count"]);
    return <div />;
  }
}

class Thumbnail extends Component {
  render() {
    return (
      <MLSMedia MediaType="Thumbnail" ListingKeyNumeric={this.props.ListingKeyNumeric} limit="1" token={authtoken}>
        {({ loading, error, data }) => (
          <div>
            {error && 
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Thumbnail" />
            }
            {data &&
              <div>
                { !data.value.length &&
                  <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Thumbnail" />
                }

                { data.value.length !== 0 &&
                  <img src={data.value[0].MediaURL} alt="Listing Thumbnail"/>
                }
              </div>
            }
          </div>
        )}
      </MLSMedia>
    )
  }
}

class AgentPhoto extends Component {
  render() {
    return (
      <MLSMedia MediaType="Thumbnail" MemberKeyNumeric={this.props.MemberKeyNumeric} limit="1" token={authtoken}>
        {({ loading, error, data }) => (
          <div>
            {error && 
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Thumbnail" />
            }
            {data &&
              <div>
                { !data.value.length &&
                  <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image%20Not%20Found&w=150&h=150" alt="Missing Thumbnail" />
                }

                { data.value.length !== 0 &&
                  <img src={data.value[0].MediaURL} alt="Agent Thumbnail"/>
                }
              </div>
            }
          </div>
        )}
      </MLSMedia>
    )
  }
}

class Listings extends Component {
  render() {
    const { listings } = this.props;

    var listingCollection = listings.map(listing => (
      <div className="box" key={Math.floor(Math.random() * Date.now()) + 1}>
        <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <Thumbnail ListingKeyNumeric={listing.ListingKeyNumeric} />
          </figure>
        </div>
          
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

          <div className="media-right">
            <figure className="image is-64x64">
              <AgentPhoto MemberKeyNumeric={listing.ListAgentKeyNumeric} />
            </figure>
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
          {this.props.data.length} Listings Retrieved
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
   const query = { filter: { 
      and: [
            { ListingId: { ne: null } },
            "City eq ResourceEnums.City'SanRamon'"
          ]
    }};
    
    // Counts can also be inlined with the query
    const queryWithCount = {
      count: true,
      ...query
    }
    return (
      <div className="container mt2">
        <MLSData collection="Property" token={authtoken} query={queryWithCount}>
          {({ loading, error, data }) => (
            <div>

              {loading &&
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="center">
                      <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
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
                  <MLSCount collection="Property" token={authtoken} query={query}>
                    {({ data }) => (
                      <div>
                        { data &&
                        <Pagination data={data} />
                      }
                      </div>
                    )}
                  </MLSCount>

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
