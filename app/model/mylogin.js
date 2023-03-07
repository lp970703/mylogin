/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('mylogin', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      unique: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    create_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    phoneNo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    tableName: 'mylogin'
  });

  Model.associate = function() {

  }

  return Model;
};
