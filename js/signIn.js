// Your web app's Firebase configuration
var firebaseConfig = {
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
          window.location.replace("../index.html")
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
