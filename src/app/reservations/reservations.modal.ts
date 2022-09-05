import { Schema, model } from 'mongoose';

const ReservationsSchema = new Schema({
   reservationId: String,
   guestMemberId: Number,
   guestName: String,
   hotelName: String,
   arrivalDate: Date,
   departureDate: Date,
   status: Boolean,
   stayAmount: Number,
   taxAmount: Number 
}, {
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' },
    versionKey: false,
});
ReservationsSchema.index({ CreatedAt: 1 });
export default model('reservations', ReservationsSchema, 'reservations');