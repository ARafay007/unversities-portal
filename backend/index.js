const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');
const AppError = require('./util/AppError');
const GlobalAppError = require('./controllers/error');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/admin', routes.AdminRoutes);
app.use('/university', routes.universityRoutes);
app.use('/student', routes.studentRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalAppError);

const db = process.env.DB.replace(/<PASSWORD>/i, process.env.DB_PASSWORD);

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {console.log("DB connected successfully");})
.catch(error => {console.log('error', error);});

app.listen(process.env.PORT, () => {
  console.log('Listening on port 4321');
});