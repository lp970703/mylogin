/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('client', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: true
    },
    userId: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    clientSecret: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    redirectUri: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    grants: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'client'
  });

  Model.associate = function() {

  }

  return Model;
};
