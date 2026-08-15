import { Router } from 'express';
import { StudentController } from '../controllers/studentController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();
const controller = new StudentController();

router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.patch('/:id', verifyToken, controller.patch);
router.delete('/:id', verifyToken, controller.delete);

export default router;