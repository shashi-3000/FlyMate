import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    travelClass: {
        type: String,
        enum: ["Economy", "Business", "First"],
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    maxStops: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Book = mongoose.model("Book", bookingSchema);

