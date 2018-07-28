import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDYQ3dRxMc0ZNpTSaNIBX5qn1-kWvHukoQ",
  authDomain: "dogmeetup-944aa.firebaseapp.com",
  databaseURL: "https://dogmeetup-944aa.firebaseio.com",
  projectId: "dogmeetup-944aa",
  storageBucket: "dogmeetup-944aa.appspot.com",
  messagingSenderId: "375082027352"
};

firebase.initializeApp(config);

export default firebase;
