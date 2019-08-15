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
var otherUserId = localStorage.getItem("otherUserId");
var chatRoom = localStorage.getItem("chatRoomId");
var userId = localStorage.getItem("userId");
let mainContainer = document.getElementById("mainContainer");

db.collection("users")
  .doc(otherUserId)
  .get()
  .then(doc => {
    document.getElementById("userName").innerHTML =
      doc.data().firstName + " " + doc.data().lastName;
  });

db.collection("users")
  .doc(userId)
  .get()
  .then(doc => {
    document.getElementById("myProfile").src = doc.data().avatar;
  });

db.collection("chatRooms")
  .doc(chatRoom)
  .collection("messages")
  .onSnapshot(res => {
    document.getElementById("mainContainer").innerHTML = "";
    res.forEach(doc => {
      if (doc.data().sendedBy == localStorage.getItem("userId")) {
        let myChatWrapper = document.createElement("div");
        myChatWrapper.setAttribute("class", "myChatWrapper");
        myChatWrapper.setAttribute("id", "myParent" + doc.data().time);
        mainContainer.append(myChatWrapper);

        let myParent = document.getElementById("myParent" + doc.data().time);
        let chatDetails = document.createElement("div");
        chatDetails.setAttribute("class", "chatDetails");
        chatDetails.style.backgroundColor = "grey";
        chatDetails.setAttribute("id", "myChild" + doc.data().time);
        myParent.appendChild(chatDetails);

        let myChild = document.getElementById("myChild" + doc.data().time);
        let msgText = document.createElement("p");
        msgText.setAttribute("class", "messageText");
        msgText.innerHTML = doc.data().message;
        myChild.append(msgText);

        // let sendedBy = document.createElement("p");
        // sendedBy.setAttribute("class", "messageText");
        // sendedBy.innerHTML = "SendedBy : " + senderName;
        // myChild.append(sendedBy);
      }

      if (doc.data().sendedBy == localStorage.getItem("otherUserId")) {
        let otherChatWrapper = document.createElement("div");
        otherChatWrapper.setAttribute("class", "otherChatWrapper");
        otherChatWrapper.setAttribute("id", "otherParent" + doc.data().time);
        mainContainer.append(otherChatWrapper);

        let otherUserParent = document.getElementById(
          "otherParent" + doc.data().time
        );
        let otherChatDetails = document.createElement("div");
        otherChatDetails.setAttribute("class", "chatDetails");
        otherChatDetails.style.backgroundColor = "lightgreen";
        otherChatDetails.setAttribute("id", "otherChild" + doc.data().time);
        otherUserParent.appendChild(otherChatDetails);

        let otherChild = document.getElementById(
          "otherChild" + doc.data().time
        );
        let otherMsgText = document.createElement("p");
        otherMsgText.setAttribute("class", "messageText");
        otherMsgText.innerHTML = doc.data().message;
        otherChild.append(otherMsgText);

        // let sendedBy = document.createElement("p");
        // sendedBy.setAttribute("class", "messageText");
        // sendedBy.innerHTML = "SendedBy : " + senderName;
        // otherChild.append(sendedBy);
      }
    });
  });

function send() {
  const txtMessage = document.getElementById("txtMessage").value;
  const timeStamp = new Date().getTime();
  if (txtMessage) {
    const chatObj = {
      message: txtMessage,
      sendedBy: userId,
      time: timeStamp
    };
    db.collection("chatRooms")
      .doc(chatRoom)
      .collection("messages")
      .doc(timeStamp.toString())
      .set(chatObj)
      .then(function() {
        db.collection("chatRooms")
          .doc(chatRoom)
          .update({
            lastMessage: txtMessage
          })
          .then(lastRes => {
            document.getElementById("txtMessage").value = "";
            mainContainer.scrollTop = mainContainer.scrollHeight;
          });
      });
  } else {
    alert("Can't be empty!");
  }
}

function updateProfile() {
  location.href = "../html/update.html";
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // alert("Logout Successfully");
      localStorage.removeItem("userId");
      localStorage.removeItem("chatRoomId");
      localStorage.removeItem("otherUserId");
      location.href = "../html/signIn.html";
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

if (!otherUserId || !chatRoom || !userId) {
  location.href = "../html/signIn.html";
}

function goBack() {
  window.history.back();
}
