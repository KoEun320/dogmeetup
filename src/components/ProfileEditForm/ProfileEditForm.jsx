import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./ProfileEditForm.css";
import { withRouter } from 'react-router-dom';
import firebase from '../../services/firebase';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("modal-root");

class ProfileEditForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            dogName: props.dog.dog_name,
            dogAge: props.dog.dog_age,
            dogBreed: props.dog.dog_breed,
            dogCharacter: props.dog.dog_character,
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

        const usersRef = firebase.database().ref('users/'+this.props.userUid);
        const dogKey = this.props.dog.id;

        if(this.state.thumbnailImageFile) {
            const storageRef = firebase.storage().ref();
            const thumbnailImageFileName = this.state.thumbnailImageFile.name;
            const thumbnailImageFileRef = storageRef.child(`images/${thumbnailImageFileName}` );
            const thumbnailImageFilePromise = thumbnailImageFileRef.put(this.state.thumbnailImageFile);

            Promise.all([thumbnailImageFilePromise])
            .then(() => {
            let thumbnailDownloadURL;

                    Promise.all([
                        thumbnailImageFilePromise.snapshot.ref.getDownloadURL(),
                    ]).then(results => {
                        thumbnailDownloadURL = results[0];
                        usersRef
                            .child('dogs_list')
                            .child(dogKey)
                            .update({
                                dog_name: this.state.dogName,
                                dog_age: this.state.dogAge,
                                dog_breed: this.state.dogBreed,
                                dog_character: this.state.dogCharacter,
                                image_url: thumbnailDownloadURL,
                            })
                            .then(() => {
                                alert("Data changed successfully.");
                                this.setState({
                                    id: '',
                                    title: '',
                                    description: '',
                                    thumbnailImageFile: null,
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
            } else {
                usersRef
                    .child('dogs_list')
                    .child(dogKey)
                    .update({
                        dog_name: this.state.dogName,
                        dog_age: this.state.dogAge,
                        dog_breed: this.state.dogBreed,
                        dog_character: this.state.dogCharacter,
                    })
                    .then(() => {
                        alert("Data changed successfully.");
                        this.setState({
                            id: '',
                            title: '',
                            description: '',
                            thumbnailImageFile: '',
                            isUploading: false
                        });
                        this.onClose(event);
                    })
                    .catch(error => {
                        alert("Please, try again")
                        console.error(error);
                    });
            }


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
                                </label>
                            <div className="media">
                                <span className="gradient-fill ti-3x mr-3">
                                </span>
                                <div className="media-body">
                                    <h4 className="card-title row">
                                        <label className="col-form-label" htmlFor="dogName">이름:</label>
                                        <input className="form-control" type="text" name="dogName" value={this.state.dogName} onChange={this.handleChange} />
                                    </h4>
                                    <p className="card-text ">
                                        <label className="col-form-label" htmlFor="dogBreed">종류:</label>
                                        <select name="dogBreed" className="custom-select form-control mb-3"  value={this.state.dogBreed} onChange={this.handleChange}>
                                            <option>선택해 주세요</option>
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
                                            <option value="말라뮤트">말라뮤트</option>
                                            <option value="말리노이즈">말리노이즈</option>
                                            <option value="말티즈">말티즈</option>
                                            <option value="잉글리쉬 마스티프">잉글리쉬 마스티프</option>
                                            <option value="불마스티프">불마스티프</option>
                                            <option value="티베탄 마스티프">티베탄 마스티프</option>
                                            <option value="멕시칸 헤어리스 도그">멕시칸 헤어리스 도그</option>
                                            <option value="버니즈 마운틴 도그">버니즈 마운틴 도그</option>
                                            <option value="뉴펀들랜드">뉴펀들랜드</option>
                                            <option value="오터 하운드">오터 하운드</option>
                                            <option value="파피용">파피용</option>
                                            <option value="페키니즈">페키니즈</option>
                                            <option value="펨브록 웰시 코기">펨브록 웰시 코기</option>
                                            <option value="미니어처 핀셔">미니어처 핀셔</option>
                                            <option value="포인터">포인터</option>
                                            <option value="저먼 쇼트헤어드 포인터">저먼 쇼트헤어드 포인터</option>
                                            <option value="포메라니안">포메라니안</option>
                                            <option value="푸들">푸들</option>
                                            <option value="퍼그">퍼그</option>
                                            <option value="그레이트 피레니즈">그레이트 피레니즈</option>
                                            <option value="레드본 쿤하운드">레드본 쿤하운드</option>
                                            <option value="체서피크 베이 리트리버">체서피크 베이 리트리버</option>
                                            <option value="컬리 코티드 리트리버">컬리 코티드 리트리버</option>
                                            <option value="골든 리트리버">골든 리트리버</option>
                                            <option value="로디지안 리지백">로디지안 리지백</option>
                                            <option value="로트바일러">로트바일러</option>
                                            <option value="살루키">살루키</option>
                                            <option value="사모예드">사모예드</option>
                                            <option value="스키퍼키">스키퍼키</option>
                                            <option value="자이언트 슈나우저">자이언트 슈나우저</option>
                                            <option value="미니어처 슈나우저">미니어처 슈나우저</option>
                                            <option value="르웰린">르웰린</option>
                                            <option value="고든 세터">고든 세터</option>
                                            <option value="아이리시 세터">아이리시 세터</option>
                                            <option value="올드 잉글리시 쉽독">올드 잉글리시 쉽독</option>
                                            <option value="셰틀랜드 십도그">셰틀랜드 십도그</option>
                                            <option value="시바">시바</option>
                                            <option value="시츄">시츄</option>
                                            <option value="브리트니">브리트니</option>
                                            <option value="코커 스패니얼">코커 스패니얼</option>
                                            <option value="제페니스 친">제페니스 친</option>
                                            <option value="서식스 스패니얼">서식스 스패니얼</option>
                                            <option value="웰시 스프링어 스패니얼">웰시 스프링어 스패니얼</option>
                                            <option value="잉글리시 스프링거 스파니엘">잉글리시 스프링거 스파니엘</option>
                                            <option value="세인트 버나드">세인트 버나드</option>
                                            <option value="아메리칸 스태퍼드셔 테리어">아메리칸 스태퍼드셔 테리어</option>
                                            <option value="오스트레일리안 테리어">오스트레일리안 테리어</option>
                                            <option value="베들링턴 테리어">베들링턴 테리어</option>
                                            <option value="보더 테리어">보더 테리어</option>
                                            <option value="댄디 딘몬트 테리어">댄디 딘몬트 테리어</option>
                                            <option value="폭스 테리어">폭스 테리어</option>
                                            <option value="아이리시 테리어">아이리시 테리어</option>
                                            <option value="케리 블루 테리어">케리 블루 테리어</option>
                                            <option value="레이클랜드 테리어">레이클랜드 테리어</option>
                                            <option value="노퍽 테리어">노퍽 테리어</option>
                                            <option value="노리치 테리어">노리치 테리어</option>
                                            <option value="페터데일 테리어">페터데일 테리어</option>
                                            <option value="스코티시 테리어">스코티시 테리어</option>
                                            <option value="실리엄 테리어">실리엄 테리어</option>
                                            <option value="오스트레일리안 실키 테리어">오스트레일리안 실키 테리어</option>
                                            <option value="티베탄 테리어">티베탄 테리어</option>
                                            <option value="토이 폭스 테리어">토이 폭스 테리어</option>
                                            <option value="웨스트 하일랜드 화이트 테리어">웨스트 하일랜드 화이트 테리어</option>
                                            <option value="아이리쉬 소프트코티드 휘튼 테리어">아이리쉬 소프트코티드 휘튼 테리어</option>
                                            <option value="요크셔 테리어">요크셔 테리어</option>
                                            <option value="비즐라">비즐라</option>
                                            <option value="와이머라너">와이머라너</option>
                                            <option value="휘핏">휘핏</option>
                                            <option value="아이리시 울프하운드">아이리시 울프하운드</option>
                                            <option value="진돗개">진돗개</option>
                                            <option value="백구">백구</option>
                                            <option value="흑구">흑구</option>
                                            <option value="네눈박이 블랙탄">네눈박이 블랙탄</option>
                                            <option value="재구">재구</option>
                                            <option value="호구">호구</option>
                                            <option value="풍산개">풍산개</option>
                                            <option value="청삽살이">청삽살이</option>
                                            <option value="백삽살개">백삽살개</option>
                                            <option value="황삽살개">황삽살개</option>
                                            <option value="제주개">제주개</option>
                                            <option value="댕견">댕견</option>
                                            <option value="불개">불개</option>
                                            <option value="코리아트라이하운드">코리아트라이하운드</option>
                                            <option value="코리안 마스티프">코리안 마스티프</option>
                                            <option value="스핑크스">스핑크스</option>
                                            <option value="와일드보어">와일드보어</option>
                                            <option value="믹스견">믹스견</option>
                                        </select>
                                    </p>
                                    <p className="card-text">
                                        <label className="col-form-label" htmlFor="dogAge">나이:</label>
                                        <input className="form-control col-sm-2" type="number" name="dogAge" min="1" max="30" value={this.state.dogAge} onChange={this.handleChange} />
                                    </p>
                                    <p className="card-text ">
                                        <label htmlFor="dogCharacter">성격|특징:</label>
                                        <input className="form-control" name="dogCharacter" type="text" value={this.state.dogCharacter} onChange={this.handleChange} />
                                    </p>
                                    <button className="btn btn-primary mb-3" onSubmit={this.onSubmitHandler} type="submit">수정 하기</button>
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

export default withRouter(ProfileEditForm);

ProfileEditForm.propTypes = {
    onLoginRequest: PropTypes.func
};
