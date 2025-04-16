import mongoose from "mongoose";

const user_booking_detailsModel = new mongoose.Schema({
        user_id: String,
        booking_id: String,
        salutation: String,
        username: String,
        email: String,
        phone: String,
        Hotel_Id: Number,
        Hotel_name: String,
        booking_date: String,
        booking_time: String,
        arrival_time: String,
        roomDet: Array,
        price: String,
        status: String,
        city: String,
        zip: String,
        adults_count: Number,
        checkin_date: String,
        checkout_date: String,
        checkin_dateF: String,
        checkout_dateF: String,
        rooms_count: Number,
        childrens_count: Number,
        pflag0: Number,
        pflag1: Number,
        pflag2: Number,
        pflag3: Number,
        payment_id: String,
        order_id: String,
        signature: String,
        invoice_id: String,
        refund_flag: Number,
        selectedGuestPerRoom: Number,
        selectedRoomCount: Number,
        selectedExtraperson: Number,
        totalExtraGuest: Number,
        totalGuestWithExtraPerson: Number,
        totalroomamountwithextraguest: Number,
        created_date: String,
        last_update_on: String,
});



export const User_Booking_Details = mongoose.models.user_booking_details || mongoose.model("user_booking_details", user_booking_detailsModel);


