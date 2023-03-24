/* indent size: 2 */
const sequelize = require("sequelize")
module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('refreshtoken', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: true
    },
    expiresAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    scope: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    clientId: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    userId: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'refreshtoken'
  });

  Model.associate = function() {

  }

  return Model;
};
