import { getallpdData,gettotalData,updateDetails,deleteMeter,deleteUser,getpdData,getpdMeter,updateMeterDetails ,getallmeterData} from "../controllers/pms/pdpms.js";
import {register,regUsers} from "../controllers/register/pdmeter.js"
import {updateBills} from '../controllers/bills/pdbills.js'

import express from "express";

const router = express.Router();

router.get('/data',getallpdData);
router.get('/meterdata',getallmeterData);
router.get('/data/:id',getpdData);
router.get('/meterdata/:id',getpdMeter);
router.get('/total',gettotalData);
router.post('/pdreg',register)
router.post('/pdusers',regUsers)
router.put('/pdupdate/:id',updateDetails)
router.put('/pdmeterupdate/:id',updateMeterDetails)
router.put('/bill/:id',updateBills)
router.delete('/pddel/:id',deleteUser)
router.delete('/pdmeterdel/:id',deleteMeter)

export default router;