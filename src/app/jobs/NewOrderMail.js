import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrder';
  }

  async handle({ data }) {
    const { order } = data;
    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Nova Encomenda',
      template: 'neworder',
      context: {
        deliveryman: order.deliveryman.name,
        recipient_name: order.recipient.recipient_name,
        address: `${order.recipient.street} n°${order.recipient.number} ${order.recipient.complement},${order.recipient.city},${order.recipient.state}`,
        product: order.product,
      },
    });
  }
}

export default new NewOrderMail();
