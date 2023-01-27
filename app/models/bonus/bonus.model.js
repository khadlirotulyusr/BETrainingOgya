module.exports = (sequelize, Sequelize) => {
    const bonusDB = sequelize.define("BONUS", {
      ENAME: {
        type: Sequelize.STRING
      },
      JOB: {
        type: Sequelize.STRING
      },
      SALE: {
        field: 'SAL',
        type:Sequelize.DOUBLE,
      },
      COMMITION: {
        field: 'COMM',
        type:Sequelize.DOUBLE,
      },
    }, {
      tableName: 'BONUS'
    });
//  console.log(bonusDB)
    return bonusDB;
  };

