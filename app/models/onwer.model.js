module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define("owners", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    document_number: {
      type: Sequelize.STRING
    }
  });
    
  return Owner;
};