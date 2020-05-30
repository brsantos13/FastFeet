import * as Yup from 'yup';
import User from '../models/User';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    const deliveryman = await Deliveryman.findAll();

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().notRequired(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }
    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().notRequired(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    deliveryman.update(req.body);
    return res.json(deliveryman);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);
    deliveryman.destroy();

    return res.json({ success: 'deliveryman is delete' });
  }
}

export default new DeliverymanController();
