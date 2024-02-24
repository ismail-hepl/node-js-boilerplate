import logger from "../../config/logger.config.js";
import asyncHandler from "../Utils/asyncHandler.js";
import authService from "../services/auth.service.js";

class AuthController {
    login = asyncHandler(async (req, res, next) => {
        logger.info("user logging in...");
        const token = await authService.login(req.body);

        logger.info("user logged in successfully");
        res.status(200).json({ status: true, message: "User logged in seccessfully", accessToken: token  });
    });
}


export default new AuthController();