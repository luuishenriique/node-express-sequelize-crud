const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);

db.roles.belongsToMany(db.users, {
  through: "user_roles"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;