const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = 8000;

const cors = require('cors'); 
app.use(
  cors({
    origin: 'http://localhost:3000', 
  })
);

mongoose
  .connect('mongodb://127.0.0.1:27017/accounts')
  .then(() => {
    console.log('Connection established');
  })
  .catch((err) => {
    console.log('error connecting to mongoDB:', err.message);
  });

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`app is serving on port ${PORT}`);
});
