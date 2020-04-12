const mongoose = require('mongoose')
const Post = require('./post.js')

const opts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

module.exports = {
  startDB: ({ user, pwd, url, db, uri }) => {
    if (uri) {
      return mongoose.connect(uri, opts)
    }
    return mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`, opts)
  },
  models: {
    Post,
  },
}
