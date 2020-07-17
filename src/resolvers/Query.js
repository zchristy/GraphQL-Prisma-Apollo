const getUserId = require('../utils/getUserId')

const Query = {
  // ===========================================================
  // USERS
  users(parent, args, ctx, info) {
    const { query, first, skip, after, orderBy } = args
    const { prisma } = ctx

    const operationArgs = {
      first,
      skip,
      after,
      orderBy
    }

    if(query) {
      operationArgs.where = {
        OR: [{
          name_contains: query
        }]
      }
    }

    return prisma.query.users(operationArgs, info)

  },
  // ===========================================================
  // POSTS
  posts(parent, args, ctx, info) {
    const { query, first, skip, after, orderBy } = args
    const { prisma } = ctx

    const operationArgs = {
      where: {
        published: true
      },
      first,
      skip,
      after,
      orderBy
    }

    if(query) {

      operationArgs.where.OR = [{
          title_contains: query
        }, {
          body_contains: query
        }]
    }

    return prisma.query.posts(operationArgs, info)

  },
  // ===========================================================
  // COMMENTS
  comments(parent, args, ctx, info) {
    const { query, first, skip, after, orderBy } = args
    const { prisma } = ctx

    const operationArgs = {
      first,
      skip,
      after,
      orderBy
    }

    if(query) {
      operationArgs.where = {
        OR: [{
          text_contains: query
        }, {
          author: {
            name_contains: query
          }
        }]
      }
    }

    return prisma.query.comments(operationArgs, info)

  },
  // ===========================================================
  // ME
  async me(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    const me = await prisma.query.user({
      where: {
        id: userId
      }
    }, info)

    return me
  },
  // ===========================================================
  // POST
  async post(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request, false)

    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      }
    }, info)

    if(!posts.length) {
      throw new Error('Post not found')
    }

    return posts[0]
  },
  // ===========================================================
  // MYPOSTS - LOGGED IN USER CAN GET THEIR POSTS
  myPosts(parent, args, ctx, info) {
    const { query, first, skip, after, orderBy } = args
    const { prisma, request } = ctx
    // Authentication Helper
    const userId = getUserId(request)

    const operationArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first,
      skip,
      after,
      orderBy
    }

    if(query) {

      operationArgs.where.OR = [{
          title_contains: query
        }, {
          body_contains: query
        }]
    }

    return prisma.query.posts(operationArgs, info)
  }
}

module.exports = { Query }
