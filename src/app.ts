import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use(cors({ origin: ['http://localhost:5173'] }));

app.get('/', (req, res) => {
  res.send('Wecome to this...');
});

// application routes
app.use('/api', router);

// app.get('/api/my-bookings', auth('user'), BookingControllers.getUserBooking);

// global error handlers
app.use(globalErrorHandler);

//Not Found
app.all('*', notFound);

export default app;
