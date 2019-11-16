import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyDjbzoimgq3sjLPsQBKmEaKKFzdc_eqb38',
    authDomain: 'crwn-db-21c91.firebaseapp.com',
    databaseURL: 'https://crwn-db-21c91.firebaseio.com',
    projectId: 'crwn-db-21c91',
    storageBucket: 'crwn-db-21c91.appspot.com',
    messagingSenderId: '227069843369',
    appId: '1:227069843369:web:20ec48db35bba5205356b8'
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      } catch (error) {
          console.log('error creating user', error.message);
      }
      
    }
    return userRef;
  };

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;