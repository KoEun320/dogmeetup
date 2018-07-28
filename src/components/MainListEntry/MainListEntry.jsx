import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./MainListEntry.css";
import { Redirect, withRouter } from 'react-router-dom';

class ProfileEntry extends Component {

    render() {
        return (
            <tr>
            <th scope="row">{this.props.dog.dog_name}</th>
            <td>{this.props.dog.dog_age}살</td>
            <td>{this.props.dog.dog_breed}</td>
            <td>{ this.props.dog.is_walking ?
                    <span className="badge badge-pill badge-danger">산책중</span> :
                    <span className="badge badge-pill badge-info">휴식중</span>
                }
            </td>
            </tr>
        );
    }
}

export default withRouter(ProfileEntry);

ProfileEntry.propTypes = {
    onLoginRequest: PropTypes.func
};
