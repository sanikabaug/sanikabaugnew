import mongoose from "mongoose";

const reviewModel = new mongoose.Schema({
    review_id: String,
    name : String,
    email : String,
    phone : String,
    package_name : String,
    package_id : String,
    rating : String,
    tour_leader : String,
    traveled_date : String,
    tagline : String,
    description : String,
    image : [String],
    creation_date : String
});

export const Review = mongoose.models.review || mongoose.model("review", reviewModel);