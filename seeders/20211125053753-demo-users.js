'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Matias',
          lastName: 'Preiti',
          password:
            '$2a$10$VnTlS/ZnLsd0CbP59B18ieEgduvqJN699qmcP/QRZGO7FtnqFG5BC',
          email: 'prueba@gmail.com',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Susanito',
          lastName: 'Preiti',
          email: 'prueba2@gmail.com',
          password:
            '$2a$10$qICUYpY9OiDwfAusYpgjauEsk//I0qSAyYxVgA68lX5lS9Oztf/vK',
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Fulanito',
          lastName: 'Preiti',
          email: 'prueba3@gmail.com',
          password:
            '$2a$10$qICUYpY9OiDwfAusYpgjauEsk//I0qSAyYxVgA68lX5lS9Oztf/vK',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Menganito',
          lastName: 'Preiti',
          email: 'prueba4@gmail.com',
          password:
            '$2a$10$qICUYpY9OiDwfAusYpgjauEsk//I0qSAyYxVgA68lX5lS9Oztf/vK',
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
