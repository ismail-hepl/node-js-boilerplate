import userService from "../services/user.service.js";
import asyncHandler from "../Utils/asyncHandler.js";
import logger from "../../config/logger.config.js";

class UserController {
    getAllUsers = asyncHandler(async (req, res, next) => {
        logger.info("fetching all users...");
        const users = await userService.getAllUsers();

        logger.info("users fetched successsfully");
        res.status(200).json({ status: true, users });
    });

    getUser = asyncHandler(async (req, res, next) => {
        logger.info(`fetching user for id: ${req.params.id}...`);
        const id = req.params.id;
        const user = await userService.getUser(id);

        logger.info("user fetched successsfully");
        res.status(200).json({ status: true, user });
    })

    createUser = asyncHandler(async (req, res, next) => {
        logger.info("creating new user...");
        await userService.createUser(req.body);
        
        logger.info("user created successfully");
        res.status(201).json({ status: true, message: "User created successfully" });
    });

    updateUser = asyncHandler(async (req, res, next) => {
        logger.info(`updating user for id: ${req.params.id}...`);
        const id = req.params.id;
        await userService.updateUser(id, req.body);

        logger.info("user updated successfully");
        res.status(200).json({ status: true, message: "User updated successfully" });
    });

    updateAccess = asyncHandler(async (req, res, next) => {
        logger.info(`removing access for the user: ${req.params.id}...`);
        const id = req.params.id;
        await userService.updateAccess(id);

        logger.info("access removed successfully");
        res.status(200).json({ status: true, message: "Access updated successfully" });
    })

    deleteUser = asyncHandler(async (req, res, next) => {
        logger.info(`deleting user for id: ${req.params.id}...`);
        const id = req.params.id;
        await userService.deleteUser(id);

        logger.info("User deleted successfully");
        res.status(200).json({ status: true, message: "User deleted successfully" });
    });
}

export default new UserController();
