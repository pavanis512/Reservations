import request from 'supertest';
import app from '../../main';



// add reservation api functionality test cases
describe('add_reservation', () => {
   
    it('Add reservation', async () => {
        return request(app)
            .post('/reservations')
            .send({
                "guestMemberId": 3,
                "guestName": "pavani",
                "hotelName": "park",
                "arrivalDate": "2022-09-02",
                "departureDate": "2022-09-05",
                "status": true,
                "stayAmount": 10,
                "taxAmount": 20
            })
            .expect(200);
    });

})





