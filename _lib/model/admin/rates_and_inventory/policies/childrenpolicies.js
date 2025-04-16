import mongoose from "mongoose";

const pms_ratesandinventory_childrenpolicyModel= new mongoose.Schema({
    id: String,
    Hotel_Id: Number,
    Hotel_name: String,
    // childrensUnder18Allowed: String,
    type: String,
    ageFrom: String,
    ageTo: String,
    rateType: String,
    amount: Number,
    rule: String,
    desc: String,
    creation_date: String,
    last_update_on: String,
});

export const Pms_Ratesandinventory_Childrenpolicy = mongoose.models.pms_ratesandinventory_childrenpolicy || mongoose.model("pms_ratesandinventory_childrenpolicy",pms_ratesandinventory_childrenpolicyModel)