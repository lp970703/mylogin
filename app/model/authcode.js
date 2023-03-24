/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('authcode', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    expiresAt: {
      type: DataTypes.TIME,
      allowNull: true
    },
    redirectUri: {
      type: DataTypes.STRING(200),
      allowNull: true
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
    tableName: 'authcode'
  });

  Model.associate = function() {

  }

  return Model;
};
