var firebaseConfig = {
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const userId = localStorage.getItem("userId");
let userEmail = "";

function focus() {
  document.getElementById("updatePass").style.backgroundColor = "green";
  document.getElementById("updatePass").value = "17%";
}

db.collection("users")
  .doc(userId)
  .onSnapshot(doc => {
    document.querySelector("#profileImage").src = doc.data().avatar;
    document.querySelector("#txtFirstName").value = doc.data().firstName;
    document.querySelector("#txLastName").value = doc.data().lastName;
    document.querySelector("#txtUsername").value = doc.data().username;
    userEmail = doc.data().email;
  });

function update() {
  const firstName = document.querySelector("#txtFirstName").value;
  const lastName = document.querySelector("#txLastName").value;
  const username = document.querySelector("#txtUsername").value;

  const payload = {
    firstName,
    lastName,
    username
  };

  try {
      db.collection("users").doc(userId).set(payload , {merge : true}).then(res => {
          alert("Profile Updated")
      })
  } catch (error) {
    console.log(error, message);
  }
}

function profilePicUpdate() {
  const profileImage = document.getElementById("txtFileName").files[0];
  try {
    uploadPic(profileImage, userEmail).then(img => {
      const payload = {
        avatar: img
      };

      db.collection("users")
        .doc(userId)
        .set(payload, { merge: true })
        .then(function() {
          alert("Profile Picture Updated");
        });
    });
  } catch (error) {
    console.log(error, message);
  }
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
