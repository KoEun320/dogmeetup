import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./ProfileForm.css";
import { Redirect, withRouter } from 'react-router-dom';
import firebase from '../../services/firebase';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("modal-root");

class ProfileForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            dogName: "",
            dogAge: "",
            dogBreed: "",
            dogCharacter:"",
            show:false,
            thumbnailImageFile: null,
            isUploading: false
        }

        this.el = document.createElement("div");
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event){
        event.preventDefault();
        if(
            this.state.dogName === ""||
            this.state.dogAge === "" ||
            this.state.dogBreed === "" ||
            this.state.dogCharacter === "" ||
            !this.state.thumbnailImageFile
        ) {
            alert("빈 항목을 채워주세요.")
        }

        const storageRef = firebase.storage().ref();
        const usersRef = firebase.database().ref('users/'+this.props.userUid);
        const thumbnailImageFileName = this.state.thumbnailImageFile.name;
        const thumbnailImageFileRef = storageRef.child(`images/${thumbnailImageFileName}` );
        const thumbnailImageFilePromise = thumbnailImageFileRef.put(this.state.thumbnailImageFile);
        const createKey = usersRef.push().key;

        Promise.all([thumbnailImageFilePromise])
        .then(() => {
        let thumbnailDownloadURL;

                Promise.all([
                    thumbnailImageFilePromise.snapshot.ref.getDownloadURL(),
                ]).then(results => {
                    thumbnailDownloadURL = results[0];
                    usersRef
                        .child('dogs_list')
                        .child(createKey)
                        .set({
                            dog_name: this.state.dogName,
                            dog_age: this.state.dogAge,
                            dog_breed: this.state.dogBreed,
                            dog_character: this.state.dogCharacter,
                            image_url: thumbnailDownloadURL,
                            last_walk_time: new Date(),
                            is_walking: false,
                        })
                        .then(() => {
                            alert("Data saved successfully.");
                            this.setState({
                                id: '',
                                title: '',
                                description: '',
                                thumbnailImageFile: null,
                                videoFile: null,
                                isUploading: false
                            });
                            this.onClose(event);
                        });
                });
            })
            .catch(error => {
                alert("Please, try again")
                console.error(error);
            });

        // // Get a key for a new Post.
        // var newPostKey = firebase.database().ref().child('posts').push().key;

        // // Write the new post's data simultaneously in the posts list and the user's post list.
        // var updates = {};
        // updates['/users/' + this.props.userUid + '/' + newPostKey] = updateInfo;

        // return firebase.database().ref().update(updates);

    }

    onThumbnailImageFile(ev) {
        this.setState({
            thumbnailImageFile: ev.target.files[0]
        });
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        var writeProfile = (
            <div className="container modal_background">
            <button type="button" className="close ti-close closebtn" onClick={(ev) => { this.onClose(ev) }}></button>
            <form method="post" onSubmit={this.handleSubmit} >
                <div className="col-12 col-lg-4">
                    <div className="card features modal_position">
                        <div className="card-body">
                                <label className="file-label has-name mgl-50">
                                    <input
                                        className="file-input"
                                        type="file"
                                        name="thumbnail"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={this.onThumbnailImageFile.bind(this)}
                                    />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload" />
                                        </span>
                                        <span className="file-label">Upload Thumbnail</span>
                                    </span>
                                    <span className="file-name">
                                        {this.state.thumbnailImageFile
                                            ? this.state.thumbnailImageFile.name
                                            : ''}
                                    </span>
                                </label>
                            <div className="media">
                                {/* <span className="gradient-fill ti-3x mr-3">
                                </span> */}
                                <div className="media-body">
                                    <h4 className="card-title row">
                                        <label className="col-form-label" htmlFor="dogName">이름:</label>
                                        <input className="form-control col-sm-6" type="text" name="dogName" onChange={this.handleChange} />
                                    </h4>
                                    <p className="card-text ">
                                        <label className="col-form-label" htmlFor="dogBreed">종류:</label>
                                        <select name="dogBreed" className="custom-select form-control mb-3" onChange={this.handleChange}>
                                            <option defaultValue >선택해 주세요</option>
                                            <option value="아펜핀셔">아펜핀셔</option>
                                            <option value="아프리칸">아프리칸</option>
                                            <option value="에어데일">에어데일</option>
                                            <option value="아키타">아키타</option>
                                            <option value="아펜젤러">아펜젤러</option>
                                            <option value="바센지">바센지</option>
                                            <option value="비글">비글</option>
                                            <option value="블루틱">블루틱</option>
                                            <option value="보르조이">보르조이</option>
                                            <option value="부비에">부비에</option>
                                            <option value="복서">복서</option>
                                            <option value="브라반숑">브라반숑</option>
                                            <option value="브리아드">브리아드</option>
                                            <option value="불독 보스턴">불독 보스턴</option>
                                            <option value="불독 프랜">불독 프랜치</option>
                                            <option value="스타포드셔 불 테리어">스타포드셔 불 테리어</option>
                                            <option value="케언 테리어">케언 테리어</option>
                                            <option value="오스트레일리안 캐틀독">오스트레일리안 캐틀독</option>
                                            <option value="치와와">치와와</option>
                                            <option value="차우차우">차우차우</option>
                                            <option value="클럼버 스파니엘">클럼버 스파니엘</option>
                                            <option value="보더콜리">보더콜리</option>
                                            <option value="블랙 앤 탄 쿤하운드">블랙 앤 탄 쿤하운드</option>
                                            <option value="카디건 웰시 코기">카디건 웰시 코기</option>
                                            <option value="코통 드 튈레아르">코통 드 튈레아르</option>
                                            <option value="닥스훈트">닥스훈트</option>
                                            <option value="달마시안">달마시안</option>
                                            <option value="그레이트 데인">그레이트 데인</option>
                                            <option value="스코티시 디어하운드">스코티시 디어하운드</option>
                                            <option value="승냥이">승냥이</option>
                                            <option value="딩고">딩고</option>
                                            <option value="도베르만">도베르만</option>
                                            <option value="노르웨이언 엘크하운드">노르웨이언 엘크하운드</option>
                                            <option value="엔틀버쳐 마운틴 독">엔틀버쳐 마운틴 독</option>
                                            <option value="아메리칸 에스키모">아메리칸 에스키모</option>
                                            <option value="그레이 하운드">그레이 하운드</option>
                                            <option value="그루넨달">그루넨달</option>
                                            <option value="아프간 하운드">아프간 하운드</option>
                                            <option value="바셋 하운드">바셋 하운드</option>
                                            <option value="블러드 하운드">블러드 하운드</option>
                                            <option value="잉글리시 폭스하운드">잉글리시 폭스하운드</option>
                                            <option value="이비전 하운드">이비전 하운드</option>
                                            <option value="트리잉 워커 쿤하운드">트리잉 워커 쿤하운드</option>
                                            <option value="시베리안 허스키">시베리안 허스키</option>
                                            <option value="키스혼드">키스혼드</option>
                                            <option value="오스트레일리안 켈피">오스트레일리안 켈피</option>
                                            <option value="코몬돌">코몬돌</option>
                                            <option value="쿠바츠">쿠바츠</option>
                                            <option value="래브라도 리트리버">래브라도 리트리버</option>
                                            <option value="레온베르거">레온베르거</option>
                                            <option value="라사압소">라사압소</option>
                                        </select>
                                    </p>
                                    <p className="card-text">
                                        <label className="col-form-label" htmlFor="dogAge">나이:</label>
                                        <input className="form-control col-sm-2" type="number" name="dogAge" min="1" max="30" onChange={this.handleChange} />
                                    </p>
                                    <p className="card-text ">
                                        <label htmlFor="dogCharacter">성격|특징:</label>
                                        <input className="form-control" name="dogCharacter" type="text" onChange={this.handleChange} />
                                    </p>
                                    <button className="btn btn-primary mb-3" onSubmit={this.onSubmitHandler} type="submit">추가 하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        );

        if (!this.props.show) {
            return null;
        }

        return ReactDOM.createPortal(
            writeProfile,
            this.el,
        );
    }
}

export default withRouter(ProfileForm);

ProfileForm.propTypes = {
    onLoginRequest: PropTypes.func
};
