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

const db = firebase.firestore();

function changeInput(id, event) {
  if (event) {
    document.getElementById(id).style.width = "50%";
  } else {
    document.getElementById(id).style.width = "23%";
  }
}

function addNumber() {
  var phoneNumber = document.getElementById("addNumber").value;
  document.getElementById("loaderNumber").style.display = "block";
  if (!phoneNumber) {
    alert("Enter Number");
  }
  else {
    db.collection("users")
      .where("phone", "==", phoneNumber)
      .get()
      .then(res => {
        document.getElementById("loaderNumber").style.display = "none";
        if (res.size) {
          document.getElementById("numberContanier").style.display = "none";
          document.getElementById("profileWrapper").style.display = "flex";
          res.forEach(doc => {
            document.getElementById("avatar").src = doc.data().avatar;
            document.getElementById("txtFullName").innerHTML =
              doc.data().firstName + " " + doc.data().lastName;
            document.getElementById(
              "txtUsername"
            ).innerHTML = doc.data().username;
            document.getElementById("txtEmail").innerHTML = doc.data().email;
            document.getElementById("txtNumber").innerHTML = doc.data().phone;
            document
              .getElementById("btnChat")
              .addEventListener("click", letsChat.bind(null, doc.id));
          });
        } else {
          alert("user not found!");
          document.getElementById("loaderNumber").style.display = "none";
        }
      })
      .catch(err => {
        document.getElementById("numberContanier").style.display = "block";
        document.getElementById("profileWrapper").style.display = "none";
        document.getElementById("loaderNumber").style.display = "none";
      });
  }
}

function letsChat(otherUserId) {
  localStorage.setItem("otherUserId", otherUserId);
  var myId = localStorage.getItem("userId");
  document.getElementById("loader").style.display = "block";
  try {
    db.collection("chatRooms")
      .where(otherUserId, "==", true)
      .where(myId, "==", true)
      .get()
      .then(res => {
        document.getElementById("loader").style.display = "none";
        if (res.size) {
          res.forEach(doc => {
            localStorage.setItem("chatRoomId", doc.id);
            location.href= '../html/chat.html'
          });
        } else {
          db.collection("chatRooms")
            .add({
              [otherUserId]: true,
              [myId]: true,
              createdAt: new Date().getTime()
            })
            .then(res => {
              localStorage.setItem("chatRoomId", res.id);
            });
        }
      });
  } catch (error) {
    console.log("code error", error);
    document.getElementById("loader").style.display = "none";
  }
}
