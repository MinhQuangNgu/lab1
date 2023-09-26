import express from 'express';
import studentController from '../controllers/studentController.js';
import middlewareController from '../controllers/middlewareController.js';
const studentRouter = express.Router();

studentRouter.get('/',middlewareController.verifyToken,studentController.getAllStudentsPaging);
studentRouter.post('/',middlewareController.verifyToken,studentController.createStudent);
studentRouter.get('/:id',middlewareController.verifyToken,studentController.getSingleStudent);
studentRouter.delete('/:id',middlewareController.verifyToken,studentController.deleteStudent);

studentRouter.get('/token/:id',studentController.getToken);


export default studentRouter;