// GraphQL yoga server helper
require('@babel/polyfill')
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { db } = require('./db')
const { resolvers, fragmentReplacements } = require('./resolvers/index')
const prisma = require('./prisma')

// Publish/Subscription
const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
       db,
       pubsub,
       prisma,
       request
    }
  },
  fragmentReplacements
})

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('Server running')
})
