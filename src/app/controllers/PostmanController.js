import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Notification from '../schemas/Notification';

class PostmanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;
    const order = await Order.findAll({
      where: {
        deliveryman_id: id,
        start_date: null,
        end_date: null,
        canceled_at: null,
      },
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    order.forEach(async (orderPostman) => {
      await Notification.findOneAndUpdate(
        {
          order_id: orderPostman.id,
          deliveryman_id: orderPostman.deliveryman_id,
          recipient_id: orderPostman.recipient_id,
        },
        {
          read: true,
        },
        {
          new: true,
        }
      );
    });

    return res.json(order);
  }

  async store(req, res) {
    const { id } = req.params;

    const order = await Order.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [
            startOfDay(Number(new Date())),
            endOfDay(Number(new Date())),
          ],
        },
        end_date: null,
      },
    });
    return res.json(order);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new PostmanController();
