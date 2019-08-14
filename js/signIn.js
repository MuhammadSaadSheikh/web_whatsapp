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

function signIn() {
  var email = document.getElementById('userEmail').value
  var password = document.getElementById('createPassword').value
  if (email == '' || password == '') {
    alert('Plesae filed the input fields for signing!')
  }
  else {
    document.getElementById("loader").style.display = "block";
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          localStorage.setItem("userId", res.user.uid)
          document.getElementById('userEmail').value = ''
          document.getElementById('createPassword').value = ''
          window.location.href = "../index.html"
          document.getElementById("loader").style.display = "none";
        })
        .catch(err => {
          alert(err.message);
          document.getElementById("loader").style.display = "none";
          document.getElementById('userEmail').value = ''
          document.getElementById('createPassword').value = ''
        })
    } catch (error) {
      console.log("Error while siging is ", error)
      document.getElementById("loader").style.display = "none";
      document.getElementById('userEmail').value = ''
      document.getElementById('createPassword').value = ''
    }
  }
}

function signUp() {
  location.href = '../html/signUp.html'
}
// function signUp(){
//   location.href = '../html/forget.html'
// }

function forgetPass() {
  location.href = '../html/forget.html'
}
function changeInput(id, event) {
  if (event) {
    (document.getElementById(id).style.width = "50%");

  } else {
    (document.getElementById(id).style.width = "23%");
  }
}