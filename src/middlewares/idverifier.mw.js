import mongoose from "mongoose";
import CustomError from "../utils/customError.js";

const verifyIdParam = (name) => (req, res, next) => {
    if(req.route && req.route.path.includes(":id")) {
        const id = req.params.id;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new CustomError(400, `Invalid ${name} id`);
        }
    }
    next();
}

export default verifyIdParam;