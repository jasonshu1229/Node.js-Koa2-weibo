/**
 * @description jest server
 * @author 书豪
 */

 const request = require('supertest')
 const server = require('../src/app').callback()

 module.exports = request(server)