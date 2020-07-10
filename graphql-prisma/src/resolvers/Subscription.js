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
  }
}
