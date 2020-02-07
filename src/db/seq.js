/*
  @description sequelize 实例
  @author 书豪
*/

const Sequelize = require ('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;

const conf = {
  host,
  dialect: 'mysql'  // 何种类型的数据库
}

if (isTest) {
  // 这里 单元测试的时候 不打印mysql 语句, 方便直接定位到错误
  // 默认的loggin 是 打印数据库mysql 语句的
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5,  //  连接池中最大的连接数量
    min: 0,
    idle: 10000,   // 如果一个连接池  10 s 之内，没有被使用，应该被释放 
  }
}

const seq = new Sequelize(database, user, password,conf) 

module.exports = seq;