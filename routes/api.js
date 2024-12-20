import express from "express";
import {UserRegistration, Login, ReadSingleProfile, ReadAllProfile, UpdateSingleUser,  DeleteSingleUser} from "../app/controllers/UserController.js"

import authMiddleware from "../app/middlewares/AuthMiddleware.js"

const router = express.Router();

router.post("/Registration", UserRegistration)
router.post("/Login", Login)
router.get("/ReadSingleProfile/:id", authMiddleware, ReadSingleProfile)
router.get("/ReadAllProfile", authMiddleware, ReadAllProfile)
router.post("/UpdateSingleUser/:id", authMiddleware, UpdateSingleUser)
router.post("/DeleteSingleUser/:id", authMiddleware, DeleteSingleUser)


export default router