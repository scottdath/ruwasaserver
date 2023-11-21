import express from "express";
import { getallData } from "../controllers/weekly/weekly.js";



const router = express.Router();

router.get('/data',getallData)



export default router;