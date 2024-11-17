import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewProject, deleteProject, getAllProject, getSingleProject, updateProject } from "../controllers/projectController.js";



const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", deleteProject);
router.put("/update/:id", updateProject);
router.get("/getall", getAllProject);
router.get("/get/:id",isAuthenticated, getSingleProject);

export default router;