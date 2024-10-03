'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pontuacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pontuacao.init({
    equipe: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    }, 
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pontuacao',
  });
  return Pontuacao;
};