import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewApplication, deleteApplication, getAllApplications } from "../controllers/softwareApplicationController.js";

const router = express.Router();

router.post("/add", addNewApplication);
router.delete("/delete/:id", isAuthenticated,deleteApplication);
router.get("/getall", getAllApplications);

export default router;