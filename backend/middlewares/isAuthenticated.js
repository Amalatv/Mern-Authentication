const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Users = require("../model/userModel");

const isAuthenticated = catchAsync(async (req, res, next) => {
  // Get token from cookie or Authorization header
  let token = req.cookies.token;
  
  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to access", 401)
    );
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await Users.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token does not exist", 401)
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return next(
      new AppError("Invalid token or session expired. Please login again.", 401)
    );
  }
});

module.exports = isAuthenticated;
