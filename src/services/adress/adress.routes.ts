import { addService, deleteService, readService, updateService } from './adressController';
import { controleOrigine } from '../../middleware/auth';
import express from "express";

const router = express.Router()
router.use(controleOrigine)

router.route('/service')
.delete(deleteService)
.put(updateService)
.get(readService)
.post(addService)

export default router