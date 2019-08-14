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

var userId = localStorage.getItem("userId");
if (!userId) {
  location.href = "html/signIn.html";
} else {
  db.collection("users")
    .doc(userId)
    .get()
    .then(doc => {
      document.getElementById("myProfile").src = doc.data().avatar;
    });
}

document.querySelector("#chatsTab").style.backgroundColor = "green";
document.querySelector("#chatsTab").style.color = "white";
document.querySelector("#border").style.marginLeft = "0%";

function _handleTab(tab) {
  const chatTab = document.querySelector("#chatsTab");
  const chatsDetail = document.querySelector("#chatsDetail");
  const contactTab = document.querySelector("#contactsTab");
  const contactsDetail = document.querySelector("#contactsDetail");

  const border = document.querySelector("#border");

  if (tab == "chatsTab") {
    chatTab.style.backgroundColor = "green";
    chatTab.style.color = "white";
    contactTab.style.backgroundColor = "white";
    contactTab.style.color = "black";
    border.style.marginLeft = "0%";
    chatsDetail.style.display = "flex";
    contactsDetail.style.display = "none";
  } else {
    chatTab.style.backgroundColor = "white";
    chatTab.style.color = "black";
    contactTab.style.backgroundColor = "green";
    contactTab.style.color = "white";
    border.style.marginLeft = "50%";
    chatsDetail.style.display = "none";
    contactsDetail.style.display = "flex";
  }
}

function addUser() {
  location.href = "html/adduser.html";
}
function updateProfile() {
  location.href = "html/update.html";
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // alert("Logout Successfully");
      localStorage.removeItem("userId");
      location.reload();
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

function dropDown() {
  document.getElementById("dropdown").style.display = "flex";
}

function closeDropdowon() {
  document.getElementById("dropdown").style.display = "none";
}
