import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewSkill, deleteSkill, getAllSkill, updateSkill } from "../controllers/skillController.js";


const router = express.Router();

router.post("/add", isAuthenticated, addNewSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.put("/update/:id", updateSkill);
router.get("/getall", getAllSkill);

export default router;