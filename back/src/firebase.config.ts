import * as firebase from 'firebase-admin';

export function initializeFirebase() {
  const serviceAccount = JSON.parse(process.env.FIREBASE);

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://desafio-stone-c3a60.firebaseio.com',
  });
}
