import db from "@/config/mongodbConfig";
import { Pms_Ratesandinventory_Managerateandinventory } from "@/_lib/model/admin/rates_and_inventory/managerateandinventory/managerateandinventory";
import { NextResponse } from "next/server";
import { format, parse, eachDayOfInterval, isBefore } from 'date-fns';

export async function GET(request) {
  const hotelId = "123456";
  const selectedRoom = request.nextUrl.searchParams.get('selectedRoom');
  const rowDataID = request.nextUrl.searchParams.get('rowDataID');
  const searchedDate = request.nextUrl.searchParams.get('searchedDate');
  const checkoutdate = request.nextUrl.searchParams.get('checkoutdate');
  const year = request.nextUrl.searchParams.get('year');

  const getDatesBetween = (checkin, checkout, year) => {
    const checkinWithYear = `${checkin} ${year}`;
    const checkoutWithYear = `${checkout} ${year}`;
  
    const checkinDate = parse(checkinWithYear, 'EEE dd MMM yyyy', new Date());
    const checkoutDate = parse(checkoutWithYear, 'EEE dd MMM yyyy', new Date());
  
    return eachDayOfInterval({ start: checkinDate, end: checkoutDate }).map(date =>
      format(date, 'EEE dd MMM')
    );
  };

  const dates = searchedDate && checkoutdate ? getDatesBetween(searchedDate, checkoutdate, year) : [];

  console.log("Dates Res:::::::::>", dates, searchedDate,
    checkoutdate)

  let response = {};
  let success = true;

  try {
    db.connect();

    response.data = await Pms_Ratesandinventory_Managerateandinventory.find();
    response.databydate = await Pms_Ratesandinventory_Managerateandinventory.find({ booking_date: searchedDate });
    response.databyid = await Pms_Ratesandinventory_Managerateandinventory.find({ Hotel_Id: hotelId, room_type: selectedRoom });
    response.databyHoteliddd = await Pms_Ratesandinventory_Managerateandinventory.find({ Hotel_Id: hotelId, booking_date: searchedDate });
    response.rowbyid = await Pms_Ratesandinventory_Managerateandinventory.findOne({ id: rowDataID });
    response.databybookingdates = await Pms_Ratesandinventory_Managerateandinventory.find({
      Hotel_Id: hotelId,
      booking_date: { $in: dates }
    });
  } catch (error) {
    response.data = { result: "error" };
    success = false;
  }

  return NextResponse.json({ ...response, success });
}

export async function POST(req) {
  const payload = await req.json();
  console.log("payload::::::::>", payload)
  let response = {};
  let success = true;

  await db.connect();

  if (payload.operation === "edit") {
    await Pms_Ratesandinventory_Managerateandinventory.updateOne(
      { id: payload.rowDataID },
      {
        rate_3hr: payload.hr3Rate,
        rate_6hr: payload.hr6Rate,
        rate_12hr: payload.hr12Rate,
        rate_24hr: payload.hr24Rate,
        total_rooms_count: payload.totalRooms,
        first_checkin_last_checkout_3hr: payload.first_checkin_last_checkout_3hr,
        first_checkin_last_checkout_6hr: payload.first_checkin_last_checkout_6hr,
        first_checkin_last_checkout_12hr: payload.first_checkin_last_checkout_12hr,
        first_checkin_last_checkout_status_3hr: payload.first_checkin_last_checkout_status_3hr,
        first_checkin_last_checkout_status_6hr: payload.first_checkin_last_checkout_status_6hr,
        first_checkin_last_checkout_status_12hr: payload.first_checkin_last_checkout_status_12hr,
        status: payload.status,
      }
    );
    response.dataAll = await Pms_Ratesandinventory_Managerateandinventory.find({
      Hotel_Id: payload.Hotel_Id,
      room_type: payload.room_type,
    });
  } else if (["bulkEdit", "bulkUpdateProp", "bulkUpdateRoom", "bulkUpdateRate"].includes(payload.operation)) {
    await Promise.all(
      payload.formattedDates.map(async (item) => {
        const query = {
          Hotel_Id: payload.Hotel_Id,
          booking_date: { $regex: new RegExp(item, 'i') },
          room_type: { $regex: new RegExp(payload.selectedRoom, 'i') },
        };

        if (payload.operation === "bulkUpdateRoom") {
          query.total_rooms_count = payload.totalRooms;
        }

        const updateFields = {
          ...(payload.operation === "bulkEdit" && { status: payload.status }),
          ...(payload.operation === "bulkUpdateProp" && { status: payload.status }),
          ...(payload.operation === "bulkUpdateRoom" && { total_rooms_count: payload.totalRooms }),
          ...(payload.operation === "bulkUpdateRate" && {
            rate_3hr: payload.rate_3hr,
            rate_6hr: payload.rate_6hr,
            rate_12hr: payload.rate_12hr,
            rate_24hr: payload.rate_24hr,
            rate_child: payload.rate_child,
            rate_extraperson: payload.rate_extraperson,
          }),
        };

        await Pms_Ratesandinventory_Managerateandinventory.updateMany(query, updateFields);
      })
    );
  } else if (payload.operation === "singleEdit") {

    await Pms_Ratesandinventory_Managerateandinventory.updateOne(
      {
        Hotel_Id: payload.Hotel_Id,
        booking_date: payload.formattedDates,
        room_type: payload.selectedRoom,
      },
      { rate_24hr: payload.rate24hr }
    );

  } else if (payload.action === "statusChange") {

    await Pms_Ratesandinventory_Managerateandinventory.updateOne(
      { id: payload.id },
      { status: payload.status === "bookable" ? "soldout" : "bookable" }
    );

  } else if (payload.action === "deleteOldDates") {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const records = await Pms_Ratesandinventory_Managerateandinventory.find();

      const oldRecords = records.filter(record => {
        const bookingDate = parse(record.booking_dateF, 'dd-MM-yyyy', new Date());
        return isBefore(bookingDate, currentDate);
      });
  
      const oldRecordIds = oldRecords.map(record => record._id);
      if (oldRecordIds.length > 0) {
        await Pms_Ratesandinventory_Managerateandinventory.deleteMany({ _id: { $in: oldRecordIds } });
      } else {
        console.log("No old records found to delete.");
      }
    } catch (error) {
      console.error("Error::::::::>", error);
      success = false;
    }

  }else {

    const search = await Pms_Ratesandinventory_Managerateandinventory.find({
      booking_dateF: payload.booking_dateF,
      room_type: { $regex: new RegExp(payload.room_type, 'i') },
    });

    if (search.length === 0) {
      await Pms_Ratesandinventory_Managerateandinventory.create(payload);
      response.data = await Pms_Ratesandinventory_Managerateandinventory.find({ Hotel_Id: payload.Hotel_Id });
      response.dataAll = await Pms_Ratesandinventory_Managerateandinventory.find();
    } else {
      response.dataExisted = { result: "Data already existed" };
      success = false;
    }

  }

  return NextResponse.json({ ...response, success });
}
