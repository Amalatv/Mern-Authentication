// const dotenv = require('dotenv');
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouters");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://luminotech.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Set-Cookie'],
}));

// Handle OPTIONS preflight
app.options('*', cors({
  origin: ['https://luminotech.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  exposedHeaders: ['Set-Cookie'],
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
