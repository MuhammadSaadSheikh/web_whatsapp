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

function changedPassword() {
  var email = document.getElementById("email").value;
  if (email == "") {
    alert("Please enter your new email!");
  }
   else {
    document.getElementById("loader").style.display = "block";
    try {
      //Send a password reset email
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          alert("Email Sended");
            location.href = "../html/signIn.html";
            document.getElementById("loader").style.display = "none";
        }).catch(err => {
            alert(err.message);
      document.getElementById("loader").style.display = "none";

          })
    } catch (error) {
      alert(error.message);
      document.getElementById("loader").style.display = "none";

    }
  }
}

function changeInput(id , event) {
    if(event){
      (document.getElementById(id).style.width = "50%");
  
    }else{
      (document.getElementById(id).style.width = "23%");
    }
  }
