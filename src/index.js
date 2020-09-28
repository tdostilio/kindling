require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { startDB, models } = require('./db')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/schemas.graphql')

if (process.env.NODE_ENV === 'production') {
  db = startDB({
    user: process.env.DB_USER,
    pwd: process.env.DB_PASS,
    db: process.env.DB_NAME,
    url: process.env.DB_URL,
  })
} else {
  db = startDB({ uri: 'mongodb://localhost:27017/env_development' })
}

const context = {
  models,
  db,
}

const Server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
})

const opts = {
  port: process.env.PORT || 4000,
}

Server.start(opts, () => {
  if (!(process.env.NODE_ENV === 'production')) {
    console.log(`Server is running on http://localhost:${opts.port}`)
  }
})
