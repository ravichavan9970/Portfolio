const express = require('express');
const { Resend } = require('resend');

const router = express.Router();

// Safe initialization - never crash server if RESEND_API_KEY is missing
const getResendClient = () => {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim()) {
    try {
      return new Resend(process.env.RESEND_API_KEY.trim());
    } catch (err) {
      console.warn("Resend client init warning:", err.message);
      return null;
    }
  }
  return null;
};

// GET /api/contact
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Contact API Running for Ravindra Chavan's Portfolio 🚀",
    resendConfigured: !!(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim())
  });
});

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // STEP 1: Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email Address is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const timestamp = new Date().toISOString();
    const resend = getResendClient();

    if (resend) {
      // STEP 2: Send email using Resend API if key provided
      const data = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'ravindrachavan265125@gmail.com',
        subject: `New Portfolio Contact Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nTimestamp: ${timestamp}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0F172A; max-width: 600px; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px;">
            <h2 style="color: #8B5CF6; margin-top: 0;">New Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #A78BFA;">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.05); white-space: pre-wrap; font-size: 14px;">${message}</div>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.08); margin: 20px 0;" />
            <p style="font-size: 11px; color: #94A3B8; margin-bottom: 0;">Sent via Ravindra Chavan's Portfolio</p>
          </div>
        `
      });

      if (data.error) {
        throw new Error(data.error.message || 'Resend API error occurred.');
      }

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully via Resend',
        data: data.data
      });
    } else {
      // Log to console if RESEND_API_KEY is not set
      console.log(`[Contact Form Received] Name: ${name} | Email: ${email} | Msg: ${message}`);
      return res.status(200).json({
        success: true,
        message: 'Message received and logged successfully (Add RESEND_API_KEY in backend/.env for direct Resend email delivery).'
      });
    }

  } catch (error) {
    console.error("Contact Form Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error occurred while processing message.'
    });
  }
});

module.exports = router;
