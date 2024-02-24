import asyncHandler from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
import CustomError from "../Utils/customError.js";
import config from "../../config/config.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, config.auth.secret, { ignoreExpiration: true });

        if(decoded.exp * 1000 < Date.now()) {
            throw new CustomError(401, "Token expired");
        }

        req.user = await userService.getUser(decoded.id);

        next();
    }

    if(!token) {
        throw new CustomError(401, "Unauthorized");
    }
});

export default protect;