import getUserId from '../utils/getUserId'

export const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, ctx, info) {
      const { request } = ctx

      const userId = getUserId(request, false)

      if(userId && userId === parent.id) {
        return parent.email
      } else {
        return null
      }
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, ctx, info) {
      const { prisma } = ctx

      const operationArgs = {
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      }

      return prisma.query.posts(operationArgs, info)

    }
  }
}
