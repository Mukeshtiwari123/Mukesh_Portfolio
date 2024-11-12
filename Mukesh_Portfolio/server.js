require('dotenv').config();


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio auth token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = require('twilio')(accountSid, authToken);
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-sms', (req, res) => {
    const { name, email, message } = req.body;
    const textMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    client.messages.create({
        body: textMessage,
        from: +twilioPhoneNumber,
        to: '+91 9545235942'
    })
    .then(message => res.status(200).send({ success: true }))
    .catch(error => res.status(500).send({ success: false, error }));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

