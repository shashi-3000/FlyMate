import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Book } from "../models/book.models.js"

const createBooking = asyncHandler(async(req,res)=>{
    const { from,to,departureDate,returnDate,travelClass,passengers,maxStops} = req.body;

    if (!from || !to || !departureDate || !travelClass || !passengers || maxStops === undefined) {
        throw new ApiError(400, "Missing required fields.");
    }

    const booking = await Book.create({
        userId: req.user._id,
        from,
        to,
        departureDate,
        returnDate,
        travelClass,
        passengers,
        maxStops
    });

    const createdBooking = await Book.findById(booking._id);
    if (!createdBooking) {
        throw new ApiError(500, "Something went wrong while creating the booking");
    }

    return res.status(201).json(
        new ApiResponse(201, createdBooking, "Flight booked successfully")
    );
});

// Get My Bookings
const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Book.find({ userId: req.user._id });

    if (!bookings || bookings.length === 0) {
        throw new ApiError(404, "No bookings found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200, bookings, "User's bookings fetched successfully")
    );
});


export { 
    createBooking,
     getMyBookings,
};

