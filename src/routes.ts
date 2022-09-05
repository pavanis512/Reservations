import express from 'express';
import reservations from './app/reservations/reservations.route'

const app = express();


app.get('/', function (req: any, res: any, next: any) {
  res.send('Welcome');
});
app.use(`/reservations`, reservations);



export = app;
