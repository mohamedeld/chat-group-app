const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const Chat = sequelize.define(
  'Chat',
  {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      // allowNull defaults to true
    },
    privacy:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
  },
  {
    tableName:"chat"
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

module.exports = Chat;