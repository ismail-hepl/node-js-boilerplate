import jwt from "jsonwebtoken";
import jwtOptions from "../../config/jwt.config.js";

const generateJwtToken = (user) => {
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtOptions.secretKey, jwtOptions.options);
    return token;
}

export default generateJwtToken;