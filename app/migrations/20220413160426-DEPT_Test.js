'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
//    await queryInterface.createTable('users', { id: Sequelize.INTEGER });
await queryInterface.createTable('Dept_test', { 
  DEPTNO: {
    //autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  DNAME: {
    type: Sequelize.STRING
  },
  LOC: {
    type: Sequelize.STRING
  }
});




    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
