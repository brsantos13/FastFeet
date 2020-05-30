import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // criar os parametros da tabela
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        user_admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    // antes de salvar cryptografar a senha
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // checar se senha conferem
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
