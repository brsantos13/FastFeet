import * as Yup from 'yup';
import User from '../models/User';
import Order from '../models/Order';
import Notification from '../schemas/Notification';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import NewOrderMail from '../jobs/NewOrderMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    const order = await Order.findAll();
    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      signature_id: Yup.number().notRequired(),
      canceled_at: Yup.date().notRequired(),
      start_date: Yup.date().notRequired(),
      end_date: Yup.date().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    let order = await Order.create(req.body);

    order = await Order.findByPk(order.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          include: [
            {
              model: File,
              as: 'avatar',
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    await Notification.create({
      content: `Novo encomenda cadastrada para o entregador(a) ${order.deliveryman.name}, tendo como destinario ${order.recipient.recipient_name}`,
      recipient_id: order.recipient_id,
      deliveryman_id: order.deliveryman_id,
      user_id: req.userId,
      order_id: order.id,
    });

    await Queue.add(NewOrderMail.key, { order });

    return res.json(order);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      signature_id: Yup.number().notRequired(),
      canceled_at: Yup.date().notRequired(),
      start_date: Yup.date().notRequired(),
      end_date: Yup.date().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    const order = await Order.findByPk(id);

    order.update(req.body);

    return res.json({ order });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (user.user_admin === false) {
      return res.status(401).json({ error: 'User does not admin' });
    }

    const { id } = req.params;
    const order = await Order.findByPk(id);
    order.destroy();

    return res.json({ success: 'A encomenda foi deletada' });
  }
}

export default new OrderController();
