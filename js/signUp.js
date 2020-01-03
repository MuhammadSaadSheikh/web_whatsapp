// Your web app's Firebase configuration
var firebaseConfig = {
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

function signUp() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var username = document.getElementById("userName").value;
  var email = document.getElementById("userEmail").value;
  var phone = document.getElementById("userNumber").value;
  var password = document.getElementById("createPassword").value;
  var confirmPassword = document.getElementById("confirmPasswrod").value;
  var txtFileName = document.getElementById("txtFileName").files[0];

  try {
    if (
      firstName == "" ||
      lastName == "" ||
      username == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      txtFileName.length == 0
    ) {
      alert("Please fill all the input fields for SignUp!");
    } else {
      if (password != confirmPassword) {
        alert("Password are not same!");
      } else {
        document.getElementById("loader").style.display = "block";
        db.collection("users")
          .where("phone", "==", phone)
          .get()
          .then(res => {
            if (res.size) {
              alert("Number already registered");
              document.getElementById("loader").style.display = "none";
            } else {
              uploadPic(txtFileName, email).then(img => {
                var userData = {
                  firstName,
                  lastName,
                  username,
                  email,
                  phone,
                  avatar: img
                };

                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(res => {
                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("userName").value = "";
                    document.getElementById("userEmail").value = "";
                    document.getElementById("userNumber").value = "";
                    document.getElementById("createPassword").value = "";
                    document.getElementById("confirmPasswrod").value = "";
                    //Save user uid in local storage
                    localStorage.setItem("userId", res.user.uid);

                    //UserData Collection
                    db.collection("users")
                      .doc(res.user.uid)
                      .set(userData)
                      .then(() => {
                        document.getElementById("loader").style.display =
                          "none";
                        alert("SignUp Successfully!");
                        window.location.href = "../index.html";
                      });
                  })
                  .catch(err => {
                    alert(err.message);
                    document.getElementById("loader").style.display = "none";
                  });
              });
            }
          });
      }
    }
  } catch (error) {
    console.log("error while signing up", error);
    document.getElementById("loader").style.display = "none";
  }
}

function changeInput(id, event) {
  if (event) {
    document.getElementById(id).style.width = "50%";
  } else {
    document.getElementById(id).style.width = "23%";
  }
}

function signIn() {
  window.location.href = "signIn.html";
}

//Upload Profile Picture
function uploadPic(file, fileName) {
  const data = new Promise(function(resolve, reject) {
    storage
      .ref()
      .child("/profileImages/" + fileName + ".jpg")
      .put(file) //file is an object of selected file
      .then(function() {
        console.log("uploaded");
        storage
          .ref()
          .child("/profileImages/" + fileName + ".jpg")
          .getDownloadURL()
          .then(url => {
            console.log("picture url", url);
            resolve(url);
          });
      });
  });
  return data;
}
