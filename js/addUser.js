// Your web app's Firebase configuration
var firebaseConfig = {
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

const userId = localStorage.getItem("userId");

function addNumber() {
  var phoneNumber = document.getElementById("addNumber").value;
  document.getElementById("loaderNumber").style.display = "block";
  if (!phoneNumber) {
    alert("Enter Number");
  } else {
    db.collection("users")
      .where("phone", "==", phoneNumber)
      .get()
      .then(res => {
        document.getElementById("loaderNumber").style.display = "none";
        if (res.size) {
          document.getElementById("numberContanier").style.display = "none";
          document.getElementById("profileWrapper").style.display = "flex";
          res.forEach(doc => {
            console.log(doc.id);
            document.getElementById("avatar").src = doc.data().avatar;
            document.getElementById("txtFullName").innerHTML =
              doc.data().firstName + " " + doc.data().lastName;
            document.getElementById(
              "txtUsername"
            ).innerHTML = doc.data().username;
            document.getElementById("txtEmail").innerHTML = doc.data().email;
            document.getElementById("txtNumber").innerHTML = doc.data().phone;
            if (doc.id == userId) {
              document.getElementById("btnChat").style.display = "none";
            } else {
              document
                .getElementById("btnChat")
                .addEventListener("click", letsChat.bind(null, doc.id));
            }
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
    //`users.${user.uid}`
    db.collection("chatRooms")
      .where(`users.${otherUserId}`, "==", true)
      .where(`users.${myId}`, "==", true)
      .get()
      .then(res => {
        document.getElementById("loader").style.display = "none";
        if (res.size) {
          res.forEach(doc => {
            localStorage.setItem("chatRoomId", doc.id);
            location.href = "../html/chat.html";
          });
        } else {
          db.collection("chatRooms")
            .add({
              users: { [otherUserId]: true, [myId]: true },
              createdAt: new Date().getTime(),
              lastMessage: "You have not started conversation yet!"
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

function addNew() {
  location.reload();
}
