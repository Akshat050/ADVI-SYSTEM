// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: Only allow your production domain
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));
app.use(bodyParser.json());

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  let { name, email, subject, message } = req.body;
  // Input validation & sanitization
  name = validator.trim(validator.escape(name || ''));
  email = validator.trim(email || '');
  subject = validator.trim(validator.escape(subject || ''));
  message = validator.trim(validator.escape(message || ''));

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (name.length > 50 || subject.length > 100 || message.length > 1000) {
    return res.status(400).json({ error: 'Input too long.' });
  }

  // SMTP config from .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'schaganty@advisystems.com',
    subject: `[Advi Systems Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Production deployment tips:
// - Use HTTPS (reverse proxy with Nginx/Apache or use a cloud platform)
// - Run with PM2 or similar process manager
// - Set all secrets in .env (never commit to git)
// - Set ALLOWED_ORIGIN to your real domain

// Instructions:
// 1. Install dependencies: npm install express nodemailer cors body-parser express-rate-limit validator
// 2. Set your SMTP credentials as environment variables or edit above.
// 3. Run: node server.js
// 4. Your frontend should POST to http://localhost:3001/api/contact 