const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
      // allowNull defaults to true
    },
  },
  {
    tableName:"users"
  }
);

sequelize.sync()
  .then(() => {
    console.log("Database synced, tables created if they didn't exist");
    // Start server here if needed
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = User;