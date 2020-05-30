module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: Sequelize.INTEGER,
      },

      recipient_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      complement: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ' ',
      },

      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      cep: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      created_at: {
        allowNull: false,

        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,

        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('recipients');
  },
};
