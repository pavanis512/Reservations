import express from 'express';
import reservationController from './reservations.controller';
const router = express.Router();
import validator from '../../helper/validatorResponse';
import schema from './reservations.validator';

router.post('/',validator(schema.addReservation), reservationController.addReservation);

router.get('/', reservationController.reservationsList);

router.get('/:reservationId', reservationController.reservationDetails);

router.put('/', reservationController.cancelReservation);

router.get('/guests/summary', reservationController.guestsSummary);

router.get('/serach/Reservations', reservationController.searchReservations);

export = router;