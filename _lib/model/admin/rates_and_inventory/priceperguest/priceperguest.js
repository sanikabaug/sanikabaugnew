import { isAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

const pms_ratesandinventory_priceperguestsModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    Hotel_name: String,
    roomid: String,
    roomname: String,
    baseOccupancy: String,
    maxOccupancy: String,
    amount: String,
    isActive: Boolean,
    occupancy: String,
    reduction: String,
    type: String,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Ratesandinventory_Priceperguests = mongoose.models.pms_ratesandinventory_priceperguests || mongoose.model("pms_ratesandinventory_priceperguests",pms_ratesandinventory_priceperguestsModel)