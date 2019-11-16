import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('wDEV6B3GGTRhr4ikumU4').collection('cartItems').doc('aMX4WTePsKlexsL3D0PA')
firestore.doc('/users/wDEV6B3GGTRhr4ikumU4/cartItems/aMX4WTePsKlexsL3D0PA');
firestore.collection('/users/wDEV6B3GGTRhr4ikumU4/cartItems');
