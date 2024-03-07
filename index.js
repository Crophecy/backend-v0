const express = require('express');
const app = express();
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});

const nodemailer = require('nodemailer');

app.use(express.json());

app.post('/contact', async (req, res) => {
  let { name, email,contactNumber, query } = req.body;

  let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7bc7663e0c74dc",
      pass: "ff961f48ffd607"
    }
  });

  let mailOptions = {
    from: 'abhi021102@gmail.com',
    to: 'abhi021102@gmail.com',
    subject: `Message from ${name}`,
    text: `From: ${email}\n\n${query}\n\n ${contactNumber}`
  };

  try {
    await transport.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});