import express from 'express';
import carRouter from './Routers/CarRoute';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'O Docker continua doido' });
})

app.use('/cars', carRouter);

export default app;
