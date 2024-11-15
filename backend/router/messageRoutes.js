import express from "express";
import { sendMessage , getAllMessages} from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", getAllMessages);

export default router;