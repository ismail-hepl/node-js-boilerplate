import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js"

const authorize = asyncHandler(async (req, res, next) => {
    if(!req.user || !req.user.isAdmin) {
        throw new CustomError(401, "unauthorized");
    }
    next();
});

export default authorize;