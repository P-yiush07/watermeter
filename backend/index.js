import express from 'express';
import admin from 'firebase-admin';

const app = express();
const port = 3000;

// Replace with your Firebase project credentials
import serviceAccount from 'file:///C:/Users/Piyus/OneDrive/Desktop/watermeter/backend/watermeter-21de2-firebase-adminsdk-4ewkb-2294a2793e.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.post('/send-notification', (req, res) => {
  const { registrationToken, title, body } = req.body;

  if (!registrationToken) {
    return res.status(400).json({ error: 'Registration token is required.' });
  }

  const message = {
    notification: {
      title: title || 'Hello from FCM',
      body: body || 'This is a test notification.',
    },
    token: registrationToken,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.json({ success: true, response });
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send notification.' });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
