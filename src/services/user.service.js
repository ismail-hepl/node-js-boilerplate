import CustomError from "../utils/customError.js";
import sendWelcomeMail from "../mails/welcome.mail.js";
import userRepository from "../repositories/user.repository.js";
import logger from "../../config/logger.config.js";
import fileHandleService from "./fileHandle.service.js";

class UserService {
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async getUser(id) {
        const user = await userRepository.getUser(id);
        if (!user) {
            throw new CustomError(404, "User not found");
        }
        return user;
    }

    async createUser(userData) {
        const user = await userRepository.createUser(userData);

        // Asynchronously send welcome mail
        sendWelcomeMail(user).catch(error => {
            logger.error(error);
        });

        return user;
    }

    async updateUser(id, userData) {
        await this.getUser(id);
        return await this.userRepository.updateUser(id, userData);
    }

    async updateAccess(id) {
        await this.getUser(id);
        return await userRepository.updateAccess(id);
    }

    async deleteUser(id) {
        await this.getUser(id);
        await userRepository.deleteUser(id);
    }

    async profileUpload(id, req) {
        const user = await this.getUser(id);
        const oldProfilePicture = user.profilePicture;
        const folderName = 'profiles';
        const allowedType = 22;
        const fileName = await fileHandleService.uploadFile(req, 'profile', folderName, allowedType, 2);
        user.profilePicture = fileName;
        await user.save();

        if(oldProfilePicture) {
            fileHandleService.removeFile(folderName, oldProfilePicture);
        }
    }
}

export default new UserService();
