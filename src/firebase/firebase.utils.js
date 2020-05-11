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
  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const {displayName,email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  


    return userRef;
  };

  export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd
    ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
      const { title, items } = docSnapshot.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    } , {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    });
  }
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
  
  export default firebase;