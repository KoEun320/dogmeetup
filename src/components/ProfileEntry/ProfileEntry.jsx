import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./ProfileEntry.css";
import { Redirect, withRouter } from 'react-router-dom';

class ProfileEntry extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className="col-12 col-lg-4">
                <div className="card features">
                    <div className="offset-8">
                        <button className="btn-sm btn-outline-info">수정</button>
                        <button className="btn-sm btn-outline-danger">삭제</button>
                    </div>
                    <div className="card-body">
                        <div className="media">
                            <span className="gradient-fill ti-3x mr-3"><img className="profile_img" src={this.props.dog.image_url} alt="dog profile" /></span>
                            <div className="media-body">
                                <h4 className="card-title">{this.props.dog.dog_name}<span className="smallText">{this.props.dog.dog_age}살</span></h4>
                                <h4 className="card-title"><span className="smallText">{this.props.dog.dog_breed}</span></h4>
                                <p className="card-text">{this.props.dog.dog_character}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileEntry);

ProfileEntry.propTypes = {
    onLoginRequest: PropTypes.func
};
