import db from "@/config/mongodbConfig";
import { User_Booking_Details } from "@/_lib/model/user/booking_details/booking_details";
import { NextResponse } from "next/server";

export async function GET(req) {
    let user_Id = req.nextUrl.searchParams.get('user_Id');
    let bookingId = req.nextUrl.searchParams.get('bookingId');

    let data = [];
    let data_refund = [];
    let data_All = [];
    let databyid = {};
    let success = true;
    try {
        db.connect()
        data = await User_Booking_Details.find();
        data_All = await User_Booking_Details.find({ username: { $ne: "" }, email: { $ne: "" }, phone: { $ne: "" } });
        databyid = await User_Booking_Details.findOne({ booking_id: bookingId });

    } catch (error) {
        data = { result: "error" }
        success = false;
    }
    return NextResponse.json({ data, data_refund, data_All, databyid, success })
}


export async function POST(req) {
    const payload = await req.json();
    // console.log("Payload: ", payload);
    let data = [];
    let dataAll = [];
    let res = [];
    let success = true;
    await db.connect();

    try {

        if (payload.action === "update") {

            // var instance = new Razorpay({ key_id: 'rzp_test_WSDgMiSQBWuzuT', key_secret: 'kuDrym9QCMzSMV4HBhVHfG0Y' })

            // var instance = new Razorpay({ key_id: 'rzp_live_AqxfH2xjDuubGM', key_secret: 'wkBMCnuc7mwiFWveI0eWhc0w' })

            let amountInRupees = payload.amt;
            let amountInPaise = Math.round(amountInRupees * 100);

            // console.log("Instance:::::::>", amountInRupees)

            // let response = await instance.orders.create({
            //     amount: amountInPaise,
            //     currency: "INR",
            //     receipt: "receipt#1",
            //     notes: {
            //         key1: "value3",
            //         key2: "value2"
            //     }
            // })

            const update = await User_Booking_Details.updateOne({ booking_id: payload.booking_id }, {
                username: payload.name, email: payload.email, phone: payload.number, price: payload.amt,
                pflag0: payload.pflag0,
                city:payload.city,
                zip:payload.zip,
                payment_id: payload.payment_id,
                order_id: payload.order_id,
                signature: payload.signature,
                invoice_id: payload.invoice_id,
                salutation: payload.salutation,
                status: payload.pflag0 === 1 ? "paid" : "unpaid"
            });
            return NextResponse.json({ data, dataAll, res, update, success });

        } else {
            let search = await User_Booking_Details.find({
                booking_id: { $regex: new RegExp(payload.booking_id, 'i') },
                Hotel_Id: payload.Hotel_Id,
            });

            if (search.length === 0) {
                //await User_Booking_Details.deleteMany();
                const user_bookings = await User_Booking_Details.create(payload);
                res = await User_Booking_Details.find();

                return NextResponse.json({ data, dataAll, res, user_bookings, success });
            } else {
                success = false

                return NextResponse.json({ data, dataAll, res, success });
            }
        }





    } catch (error) {

        console.error("Error:", error);
        data = { result: error };
        success = false;

    }
}
