import { Router } from "express";
import { createBooking, getMyBookings } from "../controllers/book.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/create").post(verifyJWT, createBooking);

router.route("/my-bookings").get(verifyJWT, getMyBookings);

export default router;

