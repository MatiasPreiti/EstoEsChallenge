'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Admin',
          description: 'Admin User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Standard',
          description: 'Standar User',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
