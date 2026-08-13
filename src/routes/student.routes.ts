import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();
const controller = new StudentController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

export default router;