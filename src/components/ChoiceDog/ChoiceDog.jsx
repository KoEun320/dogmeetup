import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import "./ChoiceDog.css";
import { Redirect, withRouter } from 'react-router-dom';
import firebase from '../../services/firebase';
import ReactDOM from 'react-dom';
const modalRoot = document.getElementById("modal-root");

class ChoiceDog extends Component {
    constructor(props){
        super(props);

        this.state = {
            timeRequired: 30,
            show:false
        }

        this.el = document.createElement("div");
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    onClose = (ev) => {
        ev.preventDefault();
        this.props.onClose && this.props.onClose(ev);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submit(ev){
        console.log(ev.target.textContent)
    }

    render() {
        var DogsProfile = (
            <div className="section light-bg modal_background">
                <div className="float-right closebtn">
                    <button type="button" className="close ti-close" onClick={(ev) => { this.onClose(ev) }}></button>
                </div>
                {/* <div className="container "> */}
                <div className="container">
                    <div className="align-middle">
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="timeRequired">예상 소요시간</label>
                            <select name="timeRequired" className="custom-select form-control" onChange={this.handleChange.bind(this)}>
                                <option value >선택해 주세요</option>
                                <option value="10">10분</option>
                                <option value="30">30분</option>
                                <option value="60">1시간</option>
                                <option value="90">1시간 30분</option>
                                <option value="120">2시간</option>
                            </select>
                        </div>
                        <div className="list-group">
                            <button type="button" className="list-group-item list-group-item-action" onClick={this.submit.bind(this)}>Cras justo odio</button>
                            <button type="button" className="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
                            <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
                            <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac</button>
                        </div>
                    </div>
                </div>
            </div>
        );

        if (!this.props.show) {
            return null;
        }

        return ReactDOM.createPortal(
            DogsProfile,
            this.el,
        );
    }
}

export default withRouter(ChoiceDog);

ChoiceDog.propTypes = {
    onLoginRequest: PropTypes.func
};
