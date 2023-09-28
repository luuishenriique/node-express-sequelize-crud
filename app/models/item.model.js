module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      isFlammable: {
        type: Sequelize.BOOLEAN
      },
      id_owner:{
        type: Sequelize.INTEGER,
        references: {
          model: 'owners',
          key: 'id'
        }
      }
    });
  
    return Item;
  };