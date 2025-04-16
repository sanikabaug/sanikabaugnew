import mongoose from "mongoose";

const pms_ratesandinventory_ChildrenpolicyoverviewModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    Hotel_name: String,
    childrenAllowed: String,
    ageofChildAllowed: String,
    rateDistribution: String,
    roomData: Array,
    desc: String,
    chilRatesDesc: Array,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Ratesandinventory_Childrenpolicyoverview = mongoose.models.pms_ratesandinventory_childrenpolicyoverview || mongoose.model("pms_ratesandinventory_childrenpolicyoverview",pms_ratesandinventory_ChildrenpolicyoverviewModel)