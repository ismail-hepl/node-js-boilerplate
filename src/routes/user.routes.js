import express from "express";
import userController from "../controllers/user.controller.js";
import verifyIdParam from "../middlewares/idverifier.mw.js";
import validateUser from "../Validation/user.validator.js";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', verifyIdParam("user"), userController.getUser);
router.post('/', validateUser, userController.createUser);
router.put('/:id', verifyIdParam("user"), validateUser, userController.updateUser);
router.put('/update_access/:id', verifyIdParam("user"), userController.updateAccess);
router.delete('/:id', verifyIdParam("user"), userController.deleteUser);

export default router;