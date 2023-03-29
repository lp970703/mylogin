/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('info_deliver', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resume_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliver_company: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliver_job: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliver_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    platform_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliverer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    update_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'info_deliver'
  });

  Model.associate = function() {

  }

  return Model;
};
