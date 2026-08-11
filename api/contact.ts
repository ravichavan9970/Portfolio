import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const timestamp = new Date().toISOString();

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ravindrachavan265125@gmail.com',
      subject: `New Portfolio Contact Request - ${name}`,
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
      throw new Error(data.error.message || 'Resend error occurred.');
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been delivered successfully. I will get back to you soon.',
      data: data.data
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send message. Please try again.'
    });
  }
}
