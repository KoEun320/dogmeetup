import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Profile.css";
import ProfileEntry from "../ProfileEntry/ProfileEntry";
import { withRouter } from 'react-router-dom';
import ProfileForm from "../ProfileForm/ProfileForm";

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: false
        }
    }
    componentDidMount(){
        this.props.onLoadDogsList(this.props.userUid);
        this.props.getLocation(this.props.userUid);
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }


    render() {
        return (
            <div className="section light-bg" id="features">
            <ProfileForm  onClose={this.showModal} show={this.state.show} {...this.props} />
                <div className="container">
                    <div className="section-title">
                        <small>PROFILE</small>
                        <h3>{this.props.displayname}</h3>
                        <button className="ti-plus" onClick={this.showModal}>추가하기</button>
                    </div>
                    <div className="row">
                    {   this.props.dogsList &&
                        this.props.dogsList.map((data, index) => {
                            return(
                                <ProfileEntry key={index} dog={data} />
                            )
                        })

                    }
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Profile);

Profile.propTypes = {

};
