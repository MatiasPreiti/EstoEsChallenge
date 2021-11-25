'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Proyects',
      [
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 3,
          status: 'developing'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'finish'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'cancel'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'developing'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'developing'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'developing'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'developing'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'developing'
        },
        {
          name: 'Esto Es Challenge',
          description: 'Api created for Challenge Backend Esto Es',
          userId: 1,
          assignedTo: 2,
          status: 'developing'
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Proyects', null, {});
  }
};
