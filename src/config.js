import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyA393LTyB0BztQYhpNLSsHZ9jSo7FqQ1Mk",
    authDomain: "simplecrudreact-2a7a3.firebaseapp.com",
    databaseURL: "https://simplecrudreact-2a7a3.firebaseio.com",
    projectId: "simplecrudreact-2a7a3",
    storageBucket: "simplecrudreact-2a7a3.appspot.com",
    messagingSenderId: "227065484825",
    appId: "1:227065484825:web:602acb898141a13c"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
export const auth = app.auth();