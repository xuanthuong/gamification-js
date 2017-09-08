module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      email: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      publish: { type: DataTypes.BOOLEAN, default: true },
      admin: { type: DataTypes.BOOLEAN, default: false },
      deleteFlag: { type: DataTypes.BOOLEAN, default: false },
      activeFlag: { type: DataTypes.BOOLEAN, default: false },
    })
  
    return User;
  }