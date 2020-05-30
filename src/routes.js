import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import PostmanController from './app/controllers/PostmanController';
import DeliveriesController from './app/controllers/DeliveriesController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/postman/:id', PostmanController.index);
routes.post('/postman/:id/delivered', PostmanController.store);

routes.get('/postman/:id/deliveries', DeliveriesController.index);

routes.use(authMiddleware);

routes.post('/users/update', UserController.update);

routes.post('/register/recipient', RecipientController.store);
routes.put('/register/update/:id', RecipientController.update);

routes.get('/list/deliveryman', DeliverymanController.index);
routes.post('/register/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/update/:id', DeliverymanController.update);
routes.delete('/deliveryman/delete/:id', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/order/list', OrderController.index);
routes.post('/order', OrderController.store);
routes.put('/order/:id/update', OrderController.update);
routes.delete('/order/:id/delete', OrderController.delete);

export default routes;
