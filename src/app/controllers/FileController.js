import * as Yup from 'yup';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      path: Yup.string().required(),
    });

    if (!(await schema.isValid({ name, path }))) {
      return res.json({ error: 'Validation fails' });
    }

    const file = await File.create({ name, path });
    return res.json(file);
  }
}

export default new FileController();
