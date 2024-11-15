import { addService, deleteService, readService, updateService } from './adressController';
import { controleOrigine } from '../../middleware/auth';
import express from "express";
import { LogRequest } from '../../config/log';

const router = express.Router()
router.use(controleOrigine)
router.use(LogRequest)

router.route('/service')
.delete(deleteService)
.put(updateService)
.get(readService)
.post(addService)

export default router