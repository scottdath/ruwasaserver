import express from "express";
import { gethhcallData,gettotalData,gethhcData,updateDetails,deleteMeter } from "../controllers/pms/hhcpms.js";
import {updateBills} from '../controllers/bills/hhcbills.js'
import {register } from "../controllers/register/hhcreg.js";


const router = express.Router();

router.get('/data',gethhcallData);
router.get('/data/:id',gethhcData)
router.get('/total',gettotalData);
router.post('/hhcreg',register);
router.put('/bill/:id',updateBills)
router.put('/hhcupdate/:id',updateDetails)
router.delete('/hhcdel/:id',deleteMeter)

export default router;