'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('dept_test', [
      {
        DEPTNO: 50,
        DNAME: 'Accounting',
        LOC: 'Jl. Pandawa'
      },
      {
        DEPTNO: 51,
        DNAME: 'Developper',
        LOC: 'Jl. Patimura'        
      },
    ], {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
