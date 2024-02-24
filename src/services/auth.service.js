import bcrypt from "bcrypt";
import CustomError from "../Utils/customError.js";
import generateJwtToken from "../Utils/generateJwtToken.js";
import userRepository from "../repositories/user.repository.js";

class AuthService {
    async login(credentials) {
        const { username, password } = credentials;
        const user = await userRepository.findUserByUsername(username);
        if(!user) {
            throw new CustomError(401, "Invalid username or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new CustomError(401, "Invalid username or password");
        }

        return generateJwtToken(user);
    }
}

export default new AuthService();