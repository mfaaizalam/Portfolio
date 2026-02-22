import nodemailer from 'nodemailer';
import Form from '../model/Form.js';

// Nodemailer transporter
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "smartwrite1414@gmail.com",         // tumhara Gmail
        pass: "lbrfwkgrgvfyafpt",                // App Password (no spaces)
    },
});

// Submit Contact Form
export const submitContactForm = async (req, res) => {
  const { name, email, project, message } = req.body;

  console.log("Received form data:", { name, email, project, message });

  try {
    // Check if email already exists
    const existing = await Form.findOne({ email });
    if (existing) {
      console.log("Duplicate email detected:", email);
      return res.status(400).json({ message: "Email already submitted!" });
    }

    // Save to MongoDB
    const form = await Form.create({ name, email, project, message });
    console.log("Form saved to MongoDB:", form);

    // Send email notification
    const mailOptions = {
      from: "smartwrite1414@gmail.com",        // tumhara Gmail
      to: "smartwrite1414@gmail.com",          // admin email
      subject: `New Contact Form Submission from ${name}`,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Project Type:</b> ${project}</p>
             <p><b>Message:</b> ${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error in submitContactForm:", err);
    res.status(500).json({ message: "Server Error" });
  }
};