import User from "../models/user.model.js";

class UserRepository {
    async getAllUsers() {
        return await User.find().select("-password");
    }

    async getUser(id) {
        return await User.findById(id).select("-password");
    }

    async findUserByUsername(username) {
        return await User.findByUsername(username);
    }

    async createUser(userData) {
        return await User.create(userData);
    }
    
    async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData);
    }

    async updateAccess(id) {
        const user = await User.findById(id);
        user.hasAccess = !user.hasAccess;

        return await user.save();
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserRepository();