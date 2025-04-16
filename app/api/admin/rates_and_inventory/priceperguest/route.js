import  db  from "@/config/mongodbConfig";
import { Pms_Ratesandinventory_Priceperguests } from "@/_lib/model/admin/rates_and_inventory/priceperguest/priceperguest";
import { NextResponse } from "next/server";

export async function GET(request){

  let hotelId = "123456";
  let selectedRoom = request.nextUrl.searchParams.get('selectedRoom');
  let rowDataID = request.nextUrl.searchParams.get('rowDataID');
  let searchedDate = request.nextUrl.searchParams.get('searchedDate');
  let roomid = request.nextUrl.searchParams.get('roomid');
  let roomname = request.nextUrl.searchParams.get('roomname');
  
  let data = [];
  let databydate = [];
  let databyid = [];
  let databyHoteliddd = [];
  let rowbyid = [];
  let success=true;
  let databyidroom = [];
  let databyidroomname = [];
  try {
    db.connect()

    //await Pms_Ratesandinventory_Priceperguests.deleteMany();

    data = await Pms_Ratesandinventory_Priceperguests.find();
    databyid = await Pms_Ratesandinventory_Priceperguests.find({Hotel_Id: hotelId});
    databyidroom = await Pms_Ratesandinventory_Priceperguests.find({Hotel_Id: hotelId, roomid: roomid});
    databyidroomname = await Pms_Ratesandinventory_Priceperguests.find({Hotel_Id: hotelId, roomname: roomname});
    
  } catch (error) {
    data={result:"error"}
    success=false;
  }
  return NextResponse.json({data, databyid, databydate, rowbyid, databyHoteliddd, databyidroom, databyidroomname, success})
}

export async function POST(req){

  const payload = await req.json();

  let data = [];
  let databyid = [];

  let dataExisted = [];
  let dataAll = [];
  let success = true;
  await db.connect();

  if (payload.action === "calculatePrice") {

    const roomIds = Object.keys(payload.groupedDatabyroomid);
    console.log("Room IDS:::::::::>", roomIds)
  
    const data = await Pms_Ratesandinventory_Priceperguests.find({
      Hotel_Id: payload.Hotel_Id,
      roomid: { $in: roomIds },
    });
  
    return NextResponse.json({ data, success });
  } else {

  await Pms_Ratesandinventory_Priceperguests.deleteMany({Hotel_Id: payload[0].Hotel_Id, roomid: payload[0].roomid})

  await Pms_Ratesandinventory_Priceperguests.insertMany(payload)

  }
  
  return NextResponse.json({ success });
}



