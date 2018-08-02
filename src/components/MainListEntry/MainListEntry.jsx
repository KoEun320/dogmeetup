import React, { Component } from "react";
import "./MainListEntry.css";
import { withRouter } from 'react-router-dom';

class ProfileEntry extends Component {

    render() {
        return (
            <div className="col-12 col-lg-4">
                <div className="card features">
                    <div className="card-body">
                        <div className="media">
                            <span className="gradient-fill ti-3x mr-3">
                                <img className="profile_img" src={this.props.dog.image_url} alt="dog profile" />
                            </span>
                            <div className="media-body">
                                <h4 className="card-title">{this.props.dog.dog_name}<span className="smallText">{this.props.dog.dog_age}살</span></h4>
                                <h4 className="card-title">
                                    <span className="smallText">{this.props.dog.dog_breed}</span>
                                </h4>
                                {
                                    this.props.dog.is_walking ?
                                    <span className="badge badge-pill badge-danger">산책중</span> :
                                    <span className="badge badge-pill badge-info">휴식중</span>
                                }
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
