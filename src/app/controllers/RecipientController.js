import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  async store(req, res) {
    // verrificar todos os campos
    const schema = Yup.object().shape({
      recipient_name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().notRequired(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // verificar se usuario e administrador
    const user = await User.findOne({ where: { id: req.userId } });

    if (!user.user_admin) {
      return res.status(400).json({ error: 'User does not administrator' });
    }

    // cadastrar entrega
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    // verrificar todos os campos
    const schema = Yup.object().shape({
      recipient_name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().notRequired(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // verificar se usuario e administrador
    const user = await User.findOne({ where: { id: req.userId } });

    if (!user.user_admin) {
      return res.status(400).json({ error: 'User does not administrator' });
    }

    // verifica que o envio existe
    const recipientExists = await User.findByPk(id);
    if (!recipientExists) {
      return res.status(401).json({ error: 'recipient does not exists' });
    }

    // atualiza informacoes
    try {
      const recipient = await Recipient.findByPk(id);
      recipient.update(req.body);
      return res.json(recipient);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new RecipientController();
