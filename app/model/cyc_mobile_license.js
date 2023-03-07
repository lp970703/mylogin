/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('cyc_mobile_license', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    appId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    appName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    appLicense: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    allowUseTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalUseTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'cyc_mobile_license'
  });

  Model.associate = function() {

  }

  return Model;
};
