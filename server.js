import app from "./app.js";
import connectDB from "./config/db.config.js";
import config from "./config/config.js";

(async () => {
    try {
        // Establishing the database connection
        await connectDB();

        // Starting the server
        app.listen(config.app.port, () => {
            console.log(`Server started listening on ${config.app.host}:${config.app.port}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
})();
