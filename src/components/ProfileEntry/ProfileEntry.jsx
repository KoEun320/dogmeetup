import React, { Component } from "react";
import "./ProfileEntry.css";
import { withRouter } from 'react-router-dom';
import firebase from '../../services/firebase';
import ProfileEditForm from "../ProfileEditForm/ProfileEditForm.jsx";

class ProfileEntry extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: false,
        }
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    delete = () => {
        const usersRef = firebase.database().ref('users/'+ this.props.userUid + "/dogs_list/" + this.props.dog.id);
        usersRef.remove()
        .then(
            alert("data successfully deleted "),
            this.props.onLoadDogsList(this.props.userUid)
        );
    }


    render() {
        return (
            <div className="col-12 col-lg-4">
                <ProfileEditForm onClose={this.showModal} show={this.state.show} {...this.props} />
                <div className="card features">
                    <div className="button-group">
                        <button className="btn-sm btn-outline-info" onClick={this.showModal} data-id={this.props.dog.id}>수정</button>
                        <button className="btn-sm btn-outline-danger" onClick={this.delete}>삭제</button>
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
