const asyncHandler = require("express-async-handler");
const { checkEmpty } = require("../utils/checkEmpty");
const BookSeat = require("../model/BookSeat");

exports.bookSeatUser = asyncHandler(async (req, res) => {
    // Extract fields from request body
    const { event_name, event_time, event_address, userId, user_name } = req.body;

    // Validate the fields
    const { error, isError } = checkEmpty({ event_name, event_time, event_address, userId, user_name });
    if (isError) {
        console.log(error);

        return res.status(400).json({ message: "All Fields Required", error });
    }

    // Create a new booking
    try {
        const result = await BookSeat.create({ event_name, event_time, event_address, userId, user_name });
        res.status(201).json({ message: "Book Seat Success", result });
    } catch (err) {
        console.error("Error booking seat:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



