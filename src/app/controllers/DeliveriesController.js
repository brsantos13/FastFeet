import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class DeliveriesController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const order = await Order.findAll({
      where: {
        deliveryman_id: id,
        start_date: { [Op.ne]: null },
        end_date: { [Op.ne]: null },
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
    return res.json(order);
  }

  async store(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new DeliveriesController();
