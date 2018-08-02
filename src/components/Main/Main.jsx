import React, { Component } from "react";
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import ChoiceDog from "../ChoiceDog/ChoiceDog";
import DogsInfo from"../DogsInfo/DogsInfo.jsx";
import _ from"lodash";
import "./Main.css";
import MainListEntry from "../MainListEntry/MainListEntry";

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYQ3dRxMc0ZNpTSaNIBX5qn1-kWvHukoQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    { props.isMarkerShown &&
      <Marker position={{ lat: props.latitude, lng: props.longitude}}
        /* animation={1} */
        onClick={props.onMarkerClick}
        options={{
                    icon: {
                      url: "https://firebasestorage.googleapis.com/v0/b/dogmeetup-944aa.appspot.com/o/images%2FmyLocation.png?alt=media&token=3228f913-d047-4076-a957-987e8d9e16ba",
                      scaledSize: { width: 24, height: 24},
                      anchor: { x: 15, y: 15 }
                    }
                }}
      />}
    {
      props.allDogsList &&
      props.allDogsList.map((data, index) => {
        var dogsListValue =_.valuesIn(data.dogs_list);
        return (
          <Marker
            key={index}
            position={{lat: data.location.latitude, lng: data.location.longitude}}
            onClick={() => props.onToggleOpen(data.id)}
            options={{
              icon: {
                url: "https://firebasestorage.googleapis.com/v0/b/dogmeetup-944aa.appspot.com/o/images%2Fdog_location.png?alt=media&token=be4bce3f-d232-43a4-891b-f2e0c2c29d89",
                scaledSize: { width: 32, height: 38}
              }
            }}
          >
          {props.openedDogsList.indexOf(data.id) !== -1 && <InfoWindow onCloseClick={()=> props.onToggleCloese(data.id)}>
              <DogsInfo info={dogsListValue} />
            </InfoWindow>
          }
          </Marker>
        )})
    }
  </GoogleMap>
);

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
        show: false,
        isMarkerShown: false,
        isOpen: false,
        openedDogsList: []
    };
  }

  componentDidMount() {
    this.props.onLoadAllDogsList();
    this.props.onLoadDogsList(this.props.userUid);
    this.delayedShowMarker();

  }

  distanceHandler(location) {
    var x = this.props.latitude - location.latitude;
    var y = this.props.longitude - location.longitude;

    var distance = Math.sqrt(x * x + y * y);

    return distance;
  }

  onToggleOpen = (id) => {
    const openedDogsListCopy = this.state.openedDogsList.slice();
    if (!openedDogsListCopy.includes(id)) {
      openedDogsListCopy.push(id);
    }

    this.setState({
      openedDogsList: openedDogsListCopy
    });
  }

  onToggleClosed = (id) => {
    let openedDogsListCopy = this.state.openedDogsList.slice();

    var result = openedDogsListCopy.filter((item) => (item === id));

    this.setState({
      openedDogsList: result
    });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  showModal = () => {
    this.setState({
        ...this.state,
        show: !this.state.show
    });
  }

  render() {
    return (
          <div className="section light-bg">
            <div className="container">
            <ChoiceDog onClose={this.showModal} show={this.state.show} {...this.props} />
              <div className="section-title">
                <small>산책 친구를 찾아보아요</small>
                <h3>산책 모임</h3>
                <button type="button" className="btn btn-primary" onClick={this.showModal} >산책하기</button>
              </div>
              <ul className="nav nav-tabs nav-justified" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#Map">Map</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#List">List</a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="Map">
                  <div className="d-flex flex-column flex-lg-row">
                      <h2>동네 친구들</h2>
                      <p className="lead">근처 친구들이 마커되어있어요</p>
                      <MapComponent
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                        onToggleOpen={this.onToggleOpen.bind(this)}
                        openedDogsList={this.state.openedDogsList}
                        onToggleCloese={this.onToggleCloese.bind(this)}
                        {...this.props}
                      />
                    <div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="List">
                  <div className="d-flex flex-column flex-lg-row">
                    <div>
                      <h2>동네 친구들</h2>
                      <p className="lead">친구를 만들어 보아요</p>
                          {
                            this.props.allDogsList&&
                            this.props.allDogsList.sort((itemA, itemB) => {
                              return (this.distanceHandler(itemA.location) - (this.distanceHandler(itemB.location)))
                            }).map( (data) => {
                              return (
                                _.valuesIn(data.dogs_list).map((data, index) => {
                                return(<MainListEntry key={index} dog={data}/>)
                              }))
                            })
                          }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    );
  }
}

export default Main;
