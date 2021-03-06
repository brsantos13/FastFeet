import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    // criar os parametros da tabela
    super.init(
      {
        recipient_name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
