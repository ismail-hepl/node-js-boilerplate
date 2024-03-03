import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import errorHandler from "./src/middlewares/errhandler.mw.js";
import protect from "./src/middlewares/protect.mw.js";
import authorize from "./src/middlewares/authorize.mw.js";
import fileUpload from "express-fileupload";


const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet()); // secure apps by setting HTTP response headers 
app.use(xss()); // Middleware for XSS protection

app.use(cors()); // Enable cors for all routes

app.use(fileUpload()); // File Upload

// Routes
app.use('/v1/users/', protect, authorize, userRoutes);
app.use('', authRoutes);

// Error Handling
app.use(errorHandler);

export default app;