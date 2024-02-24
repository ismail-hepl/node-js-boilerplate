import CustomError from "../Utils/customError.js";
import sendWelcomeMail from "../mails/welcome.mail.js";
import userRepository from "../repositories/user.repository.js";
import logger from "../../config/logger.config.js"; // Import your logger

class UserService {
    constructor(userRepository, logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async getUser(id) {
        const user = await this.userRepository.getUser(id);
        if (!user) {
            throw new CustomError(404, "User not found");
        }
        return user;
    }

    async createUser(userData) {
        const user = await this.userRepository.createUser(userData);

        // Asynchronously send welcome mail
        sendWelcomeMail(user).catch(error => {
            this.logger.error(error);
        });

        return user;
    }

    async updateUser(id, userData) {
        const user = await this.getUser(id);
        return await this.userRepository.updateUser(id, userData);
    }

    async updateAccess(id) {
        const user = await this.getUser(id);
        return await this.userRepository.updateAccess(id);
    }

    async deleteUser(id) {
        const user = await this.getUser(id);
        await this.userRepository.deleteUser(id);
    }
}

export default new UserService(userRepository, logger);
