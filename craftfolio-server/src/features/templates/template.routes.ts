import { Router } from 'express';
import { getTemplates, getTemplateDetails, createTemplate } from './template.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = Router();

router.get('/', getTemplates);
router.get('/:id', getTemplateDetails);

router.post('/', authMiddleware, adminMiddleware, createTemplate);



export default router;
