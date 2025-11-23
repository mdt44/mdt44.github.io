// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCJevVaXqyxUjWLdeaqXrXmUEw5POjSEY",
  authDomain: "dukeforest-96e53.firebaseapp.com",
  projectId: "dukeforest-96e53",
  storageBucket: "dukeforest-96e53.firebasestorage.app",
  messagingSenderId: "807394176812",
  appId: "1:807394176812:web:f3b887fc8c5df9c6efc689",
  measurementId: "G-N4C8G3HFNC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();

//auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);


async function insertUsername(userId) {
  try {
    // Query the "users" collection for documents where "uid" matches the userId
    const querySnapshot = await db.collection("users").where("uid", "==", userId).get();

    // Check if any documents were found
    if (!querySnapshot.empty) {
      // Get the first document's data (assuming "uid" is unique)
      const doc = querySnapshot.docs[0];
      const username = doc.data().username;
      const email = doc.data().email;
      const dateDay = doc.data().date.toDate().getDate()
      const dateMonth = doc.data().date.toDate().getMonth();
      const dateYear = doc.data().date.toDate().getFullYear();

      // Save the username to localStorage
      localStorage.setItem("userName", username);
      localStorage.setItem("email", email);
      localStorage.setItem("dateCreated", dateDay);
      localStorage.setItem("monthCreated", dateMonth);
      localStorage.setItem("yearCreated", dateYear);
      console.log("Username saved to localStorage:", username);
    } else {
      console.error("No user found with the given UID:", userId);
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }
}



async function leaveLobby() {
  const lobbyName = sessionStorage.getItem("lobbyName");
  const userName = localStorage.getItem("userName");

  if (!lobbyName || !userName) {
    console.error("Lobby name or user name is missing.");
    return;
  }

  // Correctly reference the user's document in the "users" subcollection
  const userRef = db.collection("lobbies").doc(lobbyName).collection("users").doc(userName);

  try {
    console.log("Attempting to delete user document:", userRef.path);

    // Delete the user's document
    await userRef.delete();
    console.log(`User "${userName}" has left the lobby "${lobbyName}".`);

    // Clear the lobby name from sessionStorage
    sessionStorage.removeItem("lobbyName");
    console.log("Lobby name removed from sessionStorage.");

    // Update the UI or perform any additional cleanup
    inLobby = false;
    document.getElementById("lobby-interface").style.display = "block";
    document.getElementById("lobby-interface2").style.display = "none";
    document.getElementById("lobby-title").innerHTML = "";
    document.getElementById("lobby-users").innerHTML = "";

    // Optionally refresh the lobby list and remove empty lobbies
    displayLobbies();
    removeEmptyLobbies();
  } catch (error) {
    console.error("Error leaving the lobby:", error);
  }
}
