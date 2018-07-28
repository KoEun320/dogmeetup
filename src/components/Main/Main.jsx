import React, { Component } from "react";
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import ChoiceDog from "../ChoiceDog/ChoiceDog";
import "./Main.css";
import firebase from '../../services/firebase';
import MainListEntry from "../MainListEntry/MainListEntry";


const MyMapComponent = compose(
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
    {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude}} animation={1}  onClick={props.onMarkerClick} />}
    {
      props.allDogsList &&
      props.allDogsList.map((data, index) => {
        return (<Marker key={index} position={{lat: data.latitude, lng: props.longitude}} /> )
      })
    }
  </GoogleMap>
)


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
        show: false,
        isMarkerShown: false,
    }
  }

  componentDidMount() {
    this.props.onLoadAllDogsList();
    this.delayedShowMarker();

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
                      <h2>친구를 찾아보세요</h2>
                      <p className="lead">근처 친구들이 마커되어있어요 <button className="ti-reload"></button></p>
                      <MyMapComponent
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                        {...this.props}
                      />
                    <div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="List">
                  <div className="d-flex flex-column flex-lg-row">
                    <div>
                      <h2>근처에 사는 친구들</h2>
                      <p className="lead">산책중에 만날수 있는 친구들<button className="ti-reload"></button></p>
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th scope="col">이름</th>
                            <th scope="col">나이</th>
                            <th scope="col">종류</th>
                            <th scope="col">산책</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.allDogsList&&
                            this.props.allDogsList.map( (data, index) => {
                              return <MainListEntry key={index} dog={data}/>
                            })
                          }
                        </tbody>
                      </table>
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

Main.propTypes = {
  onLoginRequest : PropTypes.func
};
