import { Request, Response } from 'express';
import reservationModal from './reservations.modal';
import { v4 as uuidv4 } from 'uuid';

class ReservationController {
// Add reservation
    async addReservation(req: Request, res: Response) {
        try {
            let {
                guestMemberId,
                guestName,
                hotelName,
                arrivalDate,
                departureDate,
                stayAmount,
                taxAmount } = req.body
            let reservationId = uuidv4()
            let inputData = new reservationModal({
                reservationId: reservationId,
                guestMemberId: guestMemberId,
                guestName: guestName,
                hotelName: hotelName,
                arrivalDate: arrivalDate,
                departureDate: departureDate,
                status: true,
                stayAmount: stayAmount,
                taxAmount: taxAmount
            })
            let result = await inputData.save()
            if (result)
                res.status(200).send({ Message: 'Reserved succesfully' });
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ Message: 'Something went wrong' });
        }

    }

//get all reservations
    async reservationsList(req: Request, res: Response) {
        reservationModal.find({ status: true }).then(reservationList => {
            res.status(200).send(reservationList)
        })
            .catch(error => {
                res.status(500).send("Something went wrong")
            })
    }

// get reservation details
    async reservationDetails(req: any, res: Response) {
        let { reservationId } = req.params.reservationId
        reservationModal.findOne({ reservationId: reservationId }).then(reservationData => {
            res.status(200).send(reservationData)
        })
            .catch(error => {
                res.status(500).send("Something went wrong")
            })
    }

//Canc el reservation
    async cancelReservation(req: any, res: Response) {
        let { reservationId } = req.params.reservationId
        reservationModal.updateOne({ reservationId: reservationId }, { status: false }).then(reservationData => {
            res.status(200).send(reservationData)
        })
            .catch(error => {
                res.status(500).send("Something went wrong")
            })
    }

//get reservation summary
    async guestsSummary(req: Request, res: Response) {
        let data: any = {}
        reservationModal.aggregate([
            {
                $match: {
                    arrivalDate: {
                        '$gte': new Date()
                    }
                }
            },

            {
                $project: {
                    upcomingAmount: { $sum: ["$stayAmount", "$taxAmount"] }
                }
            },
            { $count: "count" },
        ])
            .then(reservationData => {
                data.upcomingStayInfo = reservationData
                reservationModal.aggregate([
                    {
                        $match: {
                            departureDate: {
                                '$lte': new Date()
                            }
                        }
                    },
                    {
                        $project: {
                            pastAmount: { $sum: ["$stayAmount", "$taxAmount"] }
                        }
                    },
                    { $count: "count" }
                ]).then(pastReservationData => {
                    data.pastStayInfo = pastReservationData
                    res.status(200).send(data)
                })
            })
            .catch(function (err: any) {
                console.log(err)
                res.status(500).send("Something went wrong")
            })
    }

    async searchReservations(req: any, res: Response) {
        let { fromDate, toDate } = req.query
        console.log(fromDate, toDate)
        reservationModal.find({ arrivalDate: { $gt: fromDate }, departureDate: { $lte: toDate } })
            .select(['reservationId', 'guestMemberId', 'guestName'])
            .then(reservationData => {
                res.status(200).send(reservationData)
            })
            .catch(error => {
                res.status(500).send("Something went wrong")
            })
    }
}

export default new ReservationController();
