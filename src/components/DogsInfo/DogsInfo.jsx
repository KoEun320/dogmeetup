import React, { Component } from "react";
import "./DogsInfo.css";

class DogsInfo extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <ul className="list-unstyled dog_profile">
                {
                    this.props.info.map((data, index)=> {
                        return (
                            <li className="media my-2 " key={index}>
                                <img className="mr-2" src={data.image_url} alt="profile" />
                                <div className="media-body align-middle font-weight-bold">
                                        {data.dog_name}
                                        <small className="m-2"><i>{data.dog_age}살</i></small>
                                        {
                                            data.is_walking ?
                                            <span className="badge badge-pill badge-danger">산책중</span> :
                                            <span className="badge badge-pill badge-info">휴식중</span>
                                        }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export default DogsInfo;
