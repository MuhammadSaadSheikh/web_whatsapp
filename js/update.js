// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCagaFwWm9K2dbGEpktlJPQhgKeYMSxNVA",
    authDomain: "example-bddd0.firebaseapp.com",
    databaseURL: "https://example-bddd0.firebaseio.com",
    projectId: "example-bddd0",
    storageBucket: "example-bddd0.appspot.com",
    messagingSenderId: "684422025945",
    appId: "1:684422025945:web:06ce6f5e8ae9031d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function focus(){
    document.getElementById('updatePass').style.backgroundColor = 'green';
    document.getElementById('updatePass').value = '17%';
}   