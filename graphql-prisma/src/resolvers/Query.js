export const Query = {
  users(parent, args, ctx, info) {
    const { query } = args
    const { prisma } = ctx

    const operationArgs = {}

    if(query) {
      operationArgs.where = {
        OR: [{
          name_contains: query
        }, {
          email_contains: query
        }]
      }
    }

    return prisma.query.users(operationArgs, info)

  },
  posts(parent, args, ctx, info) {
    const { query } = args
    const { prisma } = ctx

    const operationArgs = {}

    if(query) {
      operationArgs.where = {
        OR: [{
          title_contains: query
        }, {
          body_contains: query
        }]
      }
    }

    return prisma.query.posts(operationArgs, info)

  },
  comments(parent, args, ctx, info) {
    const { query } = args
    const { prisma } = ctx

    const operationArgs = {}

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
  me(parent, args, ctx, info) {
    return {
      id: '123rf',
      name: 'Zach',
      email: 'test@test.com'
    }
  },
  post(parent, args, ctx, info) {
    return {
      id: '13412341234',
      title: 'From the dark side',
      body: 'Darth Vadar is looking for you',
      published: true
    }
  }
}
