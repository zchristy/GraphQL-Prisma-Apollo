export const Comment = {
  author(parent, args, ctx, info) {
    const { author } = parent
    const { users } = ctx.db

    return users.find(user => {
      return user.id === author
    })
  },
  post(parent, args, ctx, info) {
    const { posts } = ctx.db

    return posts.find(post => {
      return post.id === parent.post
    })
  }
}
