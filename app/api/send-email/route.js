import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP connection successful");
  }
});

export async function POST(request) {
  const payload = await request.json();

  console.log("payload::::>", payload)

if (payload.operation === "sendcontactmail") {

    try {

      const {
        operation,
        formData
      } = payload;



      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "You Received a Contact Enquiry",
        html: `
          <h2>Contact Enquiry</h2>
          <p>Dear Team,</p>
          <p>You have received a new booking enquiry. Please find the details below:</p>
          <hr />
          <p><strong>Full Name:</strong> ${formData.name}</p>
          <p><strong>Phone Number:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
          
          <hr />
          <p>Thank you,</p>
          <p>Your Support System</p>
        `,
      });

      return NextResponse.json({
        status: 200,
        message: "Email sent and enquiry saved successfully",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Error sending email or saving enquiry",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    status: 400,
    message: "Invalid operation",
  });
}
