import config from "./config.js";

const jwtOptions = {
    secretKey: config.auth.secret,
    options: {
        expiresIn: '1h'
    }
}

export default jwtOptions;