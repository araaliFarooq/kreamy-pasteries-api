import config from './config/index.js';
import mongoDb from './database/index.js';
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoutes.js';
import ErrorHandler from './middleware/errorHandler.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();
const prefix = '/api/v1';

const { PORT } = config;

mongoDb()
  .then(() => {
    console.log('DB Connection Made');
  })
  .catch((error) => console.log(error));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(`${prefix}/user`, authRouter);
app.use(`${prefix}/users`, userRouter);

app.use(`${prefix}/`, (req, res) => {
  res.send('Welcome to the beginnng on nothingness');
});
// app.use(ErrorHandler.notFound);
// app.use(ErrorHandler.errorHandler);
app.listen(PORT, () => {
  console.log(`Server Up And Running on Port ${PORT}`);
});
