import React, { Component } from 'react';
import WalkRecordEntry from '../WalkRecordEntry/WalkRecordEntry';
import '../WalkRecord/WalkRecord.css';

class WalkRecord extends Component {

    render() {
        return (
            <div className="section light-bg">
            <div className="container">
                <div className="row">
                <div className="col-md-8 align-items-center">
                <div className="section-title">
                    <small>내 강아지들의 산책 기록을 확인해 보세요!</small>
                    <h3>산책 기록</h3>
                </div>
                    <ul className="list-unstyled">
                        {
                            this.props.dogsList &&
                            this.props.dogsList.map((data, index) => {
                                return(
                                    <WalkRecordEntry key={index} dog={data} />
                                );
                            })
                        }
                    </ul>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default WalkRecord;

