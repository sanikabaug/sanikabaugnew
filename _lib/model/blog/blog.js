import mongoose from "mongoose";
import { Schema } from "mongoose";

const hotelrajdhaniBlog = new Schema({
    title: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    readTime: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    image: {
        public_id: String,
        url: String
    },
    sections: [
        {
            sectionheading: {
                type: String,
                required: false
            },
            sectioncontent: [
                {
                    sectioncontentone: {
                        type: String,
                        required: false
                    },
                }
            ],
            quote: {
                type: String,
                required: false
            },
            list: [
                {
                    listone: {
                        type: String,
                        required: false
                    },
                },
            ],
            tableheader: {
                type: String,
                required: false
            },
            tabledescription: {
                type: String,
                required: false
            },
            tableheaderone: [
                {
                    tableheading: {
                        type: String,
                        required: false
                    },
                },
            ],
            tabledescriptionone: [
                {
                    tabledescriptionpara: {
                        type: String,
                        required: false
                    },
                },
            ],
        }
    ],
});

export const hotelrajdhaniblog = mongoose.models.hotelrajdhaniblog || mongoose.model("hotelrajdhaniblog", hotelrajdhaniBlog);

