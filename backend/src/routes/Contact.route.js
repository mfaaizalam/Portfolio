import express from 'express';
import { submitContactForm } from '../controller/Contact.controller.js';

const router = express.Router();

router.post('/contact', submitContactForm);

export default router;