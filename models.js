const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.dbUrl, {
  logging: false
})

sequelize
  .authenticate()
  .then(() => console.log('Connect to mysql/mariadb successfully'))
  .catch(() => {
    // exit could force docker to restart until it can connect mariadb
    console.error(`Can not connect to the mysql/mariadb (${config.dbUrl})`)
    process.exit(-1)
  })

const Post = sequelize.define('post', {
  pid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: Sequelize.STRING(255),
  content: Sequelize.TEXT,
  language: Sequelize.STRING(255)
})

Post.sync()

module.exports = {
  Post
}
