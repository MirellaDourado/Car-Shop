import express from 'express';
import carRouter from './Routers/CarRoute';
import errorMiddleware from './Middlewares/HttpException';
import motorcycleRouter from './Routers/MotorcyleRouter';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'O Docker continua doido' });
});

app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);
app.use(errorMiddleware);

export default app;
