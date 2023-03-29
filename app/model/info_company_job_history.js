/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('info_company_job_history', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    job: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    job_describe: {
      type: DataTypes.TEXT,
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
    create_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    joy_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    job_place: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    job_experience: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    job_education: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    recruiters_num: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    job_level: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    job_dept: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pay_desc: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    job_requirements: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    highlights: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hiring_manager: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hiring_manager_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hiring_manager_phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    salary: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    publish_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    job_status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    expire_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    employ_reason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    professional_company: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'info_company_job_history'
  });

  Model.associate = function() {

  }

  return Model;
};
