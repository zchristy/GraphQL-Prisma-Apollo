import getUserId from '../utils/getUserId'

export const Subscription = {
  comment: {
    subscribe(parent, args, ctx, info) {
      const { prisma } = ctx

      return prisma.subscription.comment(null, info)
    }
  },
  post: {
    subscribe(parent, args, ctx, info) {
      const { prisma } = ctx

      return prisma.subscription.post(null, info)
    }
  },
  myPost: {
    subscribe(parent, args, ctx, info) {
      const { prisma, request } = ctx

      const userId = getUserId(request)

      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info)
    }
  }
}
