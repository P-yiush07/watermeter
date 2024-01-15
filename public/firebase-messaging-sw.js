importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseApp = {
    apiKey: "AIzaSyBosVG4wT0oiAXIfeBpPpxp1xcJNLie9xg",
    authDomain: "watermeter-21de2.firebaseapp.com",
    projectId: "watermeter-21de2",
    storageBucket: "watermeter-21de2.appspot.com",
    messagingSenderId: "881354986646",
    appId: "1:881354986646:web:af3d811a63644bbeb29eb7"
};

firebase.initializeApp(firebaseApp);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Log the payload to inspect its structure
  console.log('Payload:', payload);

  });

