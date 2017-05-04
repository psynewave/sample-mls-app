import React, { Component } from "react";
import MLSData, { MLSMedia, MLSCount, MLSMember } from "react-mlsdata";
import { authtoken } from "./_config.js";

class Values extends Component {
  render() {
    console.info(this.props.from, this.props.data);

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

class AgentCard extends Component {
  render() {
    return <li key={Math.floor(Math.random() * Date.now()) + 1}>{this.props.MemberFullName}</li>;
  }
}

class OfficeRoster extends Component {
  render() {
    const { agents } = this.props;

    var officeRoster = agents.map(agent => (
      <AgentCard key={Math.floor(Math.random() * Date.now()) + 1} MemberFullName={agent.MemberFullName} />
    ));

    return <ul>{officeRoster}</ul>;
  }
}

class BrokerCard extends Component {
  render() {
    const OfficeData = this.props.data;
    return (
      <MLSMember token={authtoken} MemberKeyNumeric={OfficeData.OfficeBrokerKeyNumeric}>
            {({ loading, error, data }) => (
              <div>
                {data &&
                  <div>
                    <div className="box mb3">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <AgentPhoto MemberKeyNumeric={data.MemberKeyNumeric} />
                          </figure>
                        </div>
                        <div className="media-content">
                          <div className="content">
                            <strong>{data.MemberFullName}</strong> <small>{data.MemberPreferredPhone}</small> <small>{data.MemberStateLicense}</small>
                            <div>
                              <h3 className="title bold">{OfficeData.OfficeName}</h3>
                            <h3 className="subtitle">{OfficeData.OfficeAddress1}</h3>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div> 
                }
              </div>
            )}
          </MLSMember>
    )
  }
}

class RosterDemo extends Component {
  render(){
    return (
        <div>

          <MLSMember token={authtoken} OfficeKeyNumeric={39850}>
            {({ loading, error, data }) => (
              <div>
                 {loading &&
                  <div className="columns">
                    <div className="column is-12">
                      <h3 className="center">
                        <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
                        Loading Member Information...
                      </h3>
                    </div>
                  </div>
                }
                {data &&
                  <div>
                    <Values from="RosterDemo:BrokerOfficeQuery" data={data} />
                    <BrokerCard data={data} /> 

                      <MLSMember token={authtoken} OfficeKeyNumeric={39850} roster={true}>
                        {({ loading, error, data }) => (
                          <div>
                            {data &&
                              <div>
                                <Values from="RosterDemo:MemberRosterQuery" data={data} />
                                <OfficeRoster agents={data.value} />
                              </div>
                            }
                          </div>
                        )}
                      </MLSMember>
                  </div>
                }
              </div>
            )}
          </MLSMember>


        </div>
    );
  }
}

class ListingDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

  // Auth token from https://identity.mlslistings.com/Openid/connect/token
  const query = { filter: { 
    and: [
          { ListingId: { ne: null } },
          "City eq ResourceEnums.City'SanRamon'",
          "(StandardStatus eq ResourceEnums.StandardStatus'Active')"
        ]
  }};
  
  // Counts can also be inlined with the query
  const queryWithCount = {
    count: true,
    ...query
  }

    return (

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

    )
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      tabs: [
        {
          name: "Listings",
          active: true
        },
        {
          name: "Member Info",
          active: false
        }
      ]
    }

    this.tabClick = this.tabClick.bind(this);

  }

  tabClick (tab, e) {
    e.preventDefault();
    const {tabs} = this.state;

    let _tabs = tabs.map((t) => {
      t.name === tab.name ? t.active = true : t.active = false
      return t;
    });

    this.setState({tabs: _tabs });
  } 

  render() {

    let tabs = this.state.tabs;
    let tabList = tabs.map( (tab) => {
      const active = tab.active ? "is-active" : null;
      return <li key={Math.floor(Math.random() * Date.now()) + 1} className={active} onClick={this.tabClick.bind(null, tab)}><a>{tab.name}</a></li>
    })

    let ActiveDemo = this.state.tabs[0].active ? <ListingDemo /> : <RosterDemo />;


    return (
      <div className="container mt2">
        <header className="header mb2">
          <div className="tabs">
            <ul>
              {tabList}
            </ul>
          </div>
        </header>

        <div className="container py2 appBody">
          {ActiveDemo}
        </div>
        
        <footer className="footer mt4">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>Sample React MLS App</strong> by <a href="http://www.mlslistings.com">MLSListings</a>. The source code is licensed 
                <a className="ml1" href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              </p>
              <p>
                <a className="icon" href="https://github.com/psynewave/sample-mls-app">
                  <i className="fa fa-github"></i>
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;
