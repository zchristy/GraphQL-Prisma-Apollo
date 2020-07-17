// Demo User Data
const { users } = require('./seeds/demoUserData')
// Demo Post Data
const { posts } = require('./seeds/demoPostData')
// Demo Comment Data
const { comments } = require('./seeds/demoCommentData')

const db = {
  users,
  posts,
  comments
}

module.export = { db }
