/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('info_resume', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resume_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    job: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    resume_comment: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    perfect_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deliver_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deliver_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mail_flag: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    download_key: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    download_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    business: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    upload_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    candidate_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    candidate_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    candidate_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attach_key: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attach_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'info_resume'
  });

  Model.associate = function() {

  }

  return Model;
};
