// Your web app's Firebase configuration
var firebaseConfig = {
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
