import { Router } from 'express';
import { UserEndpoint } from './endpoints';

export const router = Router();

// Place your base routes here
router.use('/user', UserEndpoint);
