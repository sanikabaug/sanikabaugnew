import db from "@/config/mongodbConfig";
import { Pms_Propertymaster_Roomfands } from "@/_lib/model/admin/property_master/room_fands/room_fands";
import { NextResponse } from "next/server";

export async function GET(req) {

  let hotelId = "123456";
  let data = [];
  let data1 = [];
  let data_by_id = [];
  let success = true;
  try {
    db.connect()

    data = await Pms_Propertymaster_Roomfands.find();
    data_by_id = await Pms_Propertymaster_Roomfands.find({Hotel_Id : hotelId});
    data1 = await Pms_Propertymaster_Roomfands.find({Hotel_Id : hotelId, availability : true});

  } catch (error) {
    data = { result: "error" }
    success = false;
  }
  return NextResponse.json({ data, data_by_id, data1, success })
}

export async function POST(req) {
  const payload = await req.json();
  console.log("Payload: ", payload);
  let data = [];
  let dataAll = [];
  let res = [];
  let success = true;
  await db.connect();

  try {

    if (payload.action === "updateAvail") {

      await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id: payload.Hotel_Id, fands_itemid: { $in: payload.selectedCheckBoxes } }, { $set: { availability: true } });

      await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id: payload.Hotel_Id, fands_itemid: { $in: payload.prevSelectedCheckBoxes } }, { $set: { availability: false } });

      return NextResponse.json({ success });

    } else if (payload.operation === "reset") {

      await Pms_Propertymaster_Roomfands.updateMany({ Hotel_Id: payload.Hotel_Id }, { availability: payload.availability });

      return NextResponse.json({ success });

    } else if (payload.action === "delete") {

      await Pms_Propertymaster_Roomfands.deleteMany({ Hotel_Id: payload.Hotel_Id, id: { $in: payload.idArr } });

      data = await Pms_Propertymaster_Roomfands.find({ Hotel_Id: payload.Hotel_Id });

      return NextResponse.json({ data, success });

    } else if (payload.action === "addExtra") {

      await Pms_Propertymaster_Roomfands.insertMany(payload.abcd);

      const hotelId = payload.abcd.length > 0 ? payload.abcd[0].Hotel_Id : null;

      if (hotelId) {

        data = await Pms_Propertymaster_Roomfands.find({ Hotel_Id: hotelId });

      } else {

        throw new Error("Hotel_Id is missing from payload.abcd.");

      }

      return NextResponse.json({ data, success });

    } else {

      await Pms_Propertymaster_Roomfands.insertMany(payload);

      data = await Pms_Propertymaster_Roomfands.find({ Hotel_Id: payload.Hotel_Id });

      return NextResponse.json({ data, success });
      
    }

  } catch (error) {
    console.error("Error in POST request:", error);
    success = false;
    return NextResponse.json({ success, message: error.message });
  }

}

