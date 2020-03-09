/**
 * @description 封装 sequelize 数据类型
 * @author 书豪
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT:  Sequelize.TEXT,
    INTEGER: Sequelize.BOOLEAN,
}