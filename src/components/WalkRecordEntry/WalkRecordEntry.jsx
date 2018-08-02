import React, { Component } from 'react';
import './WalkRecordEntry.css';
import _ from"lodash";

class WalkRecordEntry extends Component {

    render() {
        return (
            <li className="media mt-5">
                <div className="circle-icon mr-4" style ={ { backgroundImage: `url(${this.props.dog.image_url})` , backgroundSize: "cover" , backgroundPosition: "center", backgroundClip: "border-box" , border: "2px solid rgb(74, 13, 143)" } }>
                </div>
                <div className="media-body">
                    <h5>{this.props.dog.dog_name}</h5>
                    <ul className="list-group list-group-flush" style={ { height: "200px" , overflowY: "auto"}}>
                    {
                        this.props.dog.walk_time &&
                        _.valuesIn(this.props.dog.walk_time).map((data, index) => {
                            return(
                                <li className="list-group-item" key={index}>{data}</li>
                            )
                        })
                    }
                    </ul>
                </div>
            </li>
        );
    }
}

export default WalkRecordEntry;

