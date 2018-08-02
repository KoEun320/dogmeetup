import React, { Component } from "react";
import "./ChoiceDog.css";
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import firebase from '../../services/firebase';
import cron from "node-cron";
const modalRoot = document.getElementById("modal-root");

class ChoiceDog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeRequired: 0,
            show: false
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

    submit(ev) {
        if (this.state.timeRequired === 0) {
            alert("예상 소요시간을 입력해 주세요");
        } else {
            var userRef = firebase.database().ref();
            var date = new Date();
            var yyyy = date.getFullYear();
            var dd = date.getDate();
            var mm = (date.getMonth() + 1);

            if (dd < 10)
                dd = "0" + dd;

            if (mm < 10)
                mm = "0" + mm;

            var current_day = yyyy + "-" + mm + "-" + dd;

            var hours = date.getHours()
            var minutes = date.getMinutes()
            var seconds = date.getSeconds();

            if (hours < 10)
                hours = "0" + hours;

            if (minutes < 10)
                minutes = "0" + minutes;

            if (seconds < 10)
                seconds = "0" + seconds;

            var date_format_str =  current_day + " " + hours + ":" + minutes + ":" + seconds;

                userRef
                .child('users/' + this.props.userUid + '/dogs_list/' + ev.target.dataset.id)
                .update({ is_walking: true });

                userRef
                .child('users/' + this.props.userUid + '/dogs_list/' + ev.target.dataset.id + "/walk_time")
                .push(date_format_str);

                this.onClose(ev);

                var userUid = this.props.userUid;
                var dogUid = ev.target.dataset.id;
                var checkTime

                switch (this.state.timeRequired) {
                    case '10':
                        checkTime = "* 10 * * * *";
                        break;
                    case '30':
                        checkTime = "* 30 * * * *";
                        break;
                    case '60':
                        checkTime = "* * 1 * * *";
                        break;
                    case '90':
                        checkTime = "* 30 1 * * *";
                        break;
                    case '120':
                        checkTime = "* * 2 * * *";
                        break;
                    default:
                      checkTime = "* 30 * * * *";
                }

            var cronjob = cron.schedule(checkTime, () => {
                firebase
                .database()
                .ref()
                .child('users/' + userUid+ '/dogs_list/' + dogUid)
                .update({ is_walking: false });
                console.log("cron job is done");

                cronjob.destroy();
            }, false);

            cronjob.start();
        }
    }

    render() {
        var DogsProfile = (
            <div className="section light-bg modal_background">
                <div className="float-right closebtn">
                    <button type="button" className="close ti-close" onClick={(ev) => { this.onClose(ev) }}></button>
                </div>
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
                            {
                                this.props.dogsList && this.props.dogsList.map((data, index) => {
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className="list-group-item list-group-item-action"
                                            data-id={data.id}
                                            onClick={this.submit.bind(this)}
                                        >
                                            {data.dog_name}
                                        </button>
                                    );
                                })
                            }
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
