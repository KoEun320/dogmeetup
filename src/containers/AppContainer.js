import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AppComponent from "../components/App/App.jsx";
import firebase from 'firebase/app';
import { loginRequest, loginSuccess,  loginFailure, getDogsListbyUser, getAllDogsList, getUserLocation} from "./../actions";


//앱으로 props 내려주는곳 꼭 reducer컨바인이랑 같을 필요가 없다.
const mapStateToProps = (state) => {

  return {
    email : state.authentication.email,
    displayname : state.authentication.displayname,
    userUid: state.authentication.uid,
    dogsList: state.dogs.dogslist,
    latitude: state.authentication.latitude,
    longitude: state.authentication.longitude,
    allDogsList: state.dogs.alldogslist
  };
};

const mapDispatchToProps = dispatch => ({
  onLoginRequest: () => {
    dispatch(loginRequest());
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var usersRef = firebase.database().ref('users/');

      firebase.database().ref().child('users/' + user.uid).once('value').then(function(snapshot) {
        var email = snapshot.val();

        if(!email) {
          usersRef.child(user.uid).set({
            displayname: user.displayName,
            email: user.email
          }, (error) => {
              if (error) {
                  alert("Data could not be saved." + error);
              } else {
                  alert("Joined successfully.");

                  dispatch(loginSuccess(user));
              }
          });
        } else {
          dispatch(loginSuccess(user));
        }
      });
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;

      console.log(errorCode + " error :" + errorMessage + " with " + email);
      dispatch(loginFailure(error));
    });
  },

  onLoginSuccess: (user) => {
    dispatch(loginSuccess(user));
  },

  onCheckIsLogin: () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch(loginSuccess(user));
      }
    });
  },

  onLogout: () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("successfully logout");
    }).catch(function(error) {
      // An error happened.
      alert("please, try again");
    });
  },

  onLoadDogsList: (userUid) => {
    const dbRefUsersList = firebase.database().ref().child('users/' + userUid + '/dogs_list');
    let dogsArray = [];

    dbRefUsersList.on('value', snapshot => {
      var snap = snapshot.val();
      if(snap) {
        var keys = Object.keys(snap)

        for(var i =0; i < keys.length; i++){
          snap[keys[i]].id = keys[i];
          dogsArray.push(snap[keys[i]]);
        }

        dispatch(getDogsListbyUser(dogsArray));
        dogsArray = [];
      }
    });
  },

  onLoadAllDogsList: () => {
    const dbRefUsersList = firebase.database().ref().child('users/');
    let dogsArray = [];

    dbRefUsersList.on('value', snapshot => {
      var snap = snapshot.val();

      if(snap) {
        var keys = Object.keys(snap)

        for(var i =0; i < keys.length; i++){
          snap[keys[i]].id = keys[i];
          dogsArray.push(snap[keys[i]]);
        }

        dispatch(getAllDogsList(dogsArray));
        dogsArray = [];
      }
    });
  },

  getLocation: (userUid) => {
    function geo_success(position) {
      const location = {
        latitude : position.coords.latitude || 37.5662952,
        longitude: position.coords.longitude || 126.97794509999994
      };
      var usersRef = firebase.database().ref('users/');

      usersRef.child(userUid).child("location").set({
        latitude: position.coords.latitude || 37.5662952,
        longitude: position.coords.longitude ||126.97794509999994
      });

        dispatch(getUserLocation(location));
    }

    function geo_error() {
      alert("위치 정보를 사용할 수 없습니다.");
    }

    var geo_options = {
      enableHighAccuracy: false,
      maximumAge        : 30000,
      timeout           : 27000
    };

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  }

});

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));

export default AppContainer;
