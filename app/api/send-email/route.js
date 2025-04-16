import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/config/mongodbConfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
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

  console.log("Payload:::::::>", payload);



  await db.connect();

  if (payload.operation === "sendenquirymail") {
    try {

      const { 
        operation, 
        booking_id, 
        name, 
        email, 
        number,
        city, 
        zip,
        amt,
        bookingDetails,
        nights,
        selected
       } = payload;




      const {
        salutation,
        Hotel_name,
        checkin_dateF,
        checkout_dateF,
        adults_count,
        childrens_count,
        price,
        totalroomamountwithextraguest,
        arrival_time,
      } = bookingDetails;

      // Generate HTML for the room details
      const emailHTML = `
  <h2>Booking Details</h2>
  <p>Dear Team,</p>
  <p>You have received a new booking enquiry. Please find the details below:</p>
  <hr />
  <p><strong>Booking ID:</strong> ${booking_id}</p>
  <p><strong>Customer Name:</strong> ${salutation} ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${number}</p>
  <p><strong>City:</strong> ${city}</p>
  <p><strong>ZIP:</strong> ${zip}</p>
  <p><strong>Checkin Date:</strong> ${checkin_dateF}</p>
  <p><strong>Checkout Date:</strong> ${checkout_dateF}</p>
  <p><strong>Arrival Time:</strong> ${selected}</p>
  <p><strong>Adults Count:</strong> ${adults_count}</p>
  <p><strong>Children Count:</strong> ${childrens_count}</p>

  <h3>Room Details:</h3>
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>Name</th>
        <th>Room</th>
        <th>Guest per Room</th>
        <th>Base Price</th>
        <th>Total Guest</th>
        <th>Extra Guest</th>
        <th>Total Room Amount</th>
        <th>Total Extra Guest Amount</th>
        <th>Total Guest Pay</th>
      </tr>
    </thead>
    <tbody>
      ${bookingDetails?.roomDet
        .map(
          (item) => `
            <tr>
              <td>${item.name || ''}</td>
              <td>${item.selectedRoomCount || ''}</td>
              <td>${item.selectedGuestPerRoom || ''} Adults, ${childrens_count} Children</td>
              <td>₹${item.amount || ''}</td>
              <td>${item.totalGuestWithExtraPerson || ''}</td>
              <td>${item.totalExtraGuest || '0'} (₹200 extra mattress per extra guest)</td>
              <td>₹${item.totalroomamount || '0'}</td>
              <td>₹${item.totalExtraGuestAmount || '0'}</td>
              <td>₹${item.totalroomamountwithextraguest || '0'}</td>
            </tr>
          `
        )
        .join('')}
    </tbody>
  </table>

  <h3>Payment Summary:</h3>
  ${bookingDetails?.roomDet
    .map(
      (item) => `
        <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0; display: flex; justify-content: space-between;">
          <p style="font-weight: 500;">${item.name}</p>
          <p style="font-weight: 600;">₹${item.totalroomamountwithextraguest}</p>
        </div>
      `
    )
    .join('')}

  <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0; display: flex; justify-content: space-between; gap: 2;">
    <p style="font-weight: 500;">Nights</p>
    <p style="font-weight: 600;">${nights}</p>
  </div>

  <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 1.125rem; margin-top: 20px; gap: 2;">
    <p style="color: #1f2937;">Total Price</p>
    <p style="color: #1f2937;">₹${bookingDetails?.totalroomamountwithextraguest * nights}</p>
  </div>

  <hr />
  <p>Thank you,</p>
  <p>Your Booking System</p>
`;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: "You Received a Booking Enquiry",
  html: emailHTML,
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
  } else if (payload.operation === "sendcontactmail") {

    try {

      const {
        operation,
        fullName,
        phoneNumber,
        email,
        message
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
          <p><strong>Fullname:</strong> ${fullName}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          
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
