import express from 'express';
import carRouter from './Routers/CarRoute';
import errorMiddleware from './Middlewares/HttpException';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'O Docker continua doido' });
});

app.use('/cars', carRouter);
app.use(errorMiddleware);

export default app;
