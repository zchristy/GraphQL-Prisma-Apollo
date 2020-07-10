export const Post = {
  author(parent, args, ctx, info) {
    const { author } = parent
    const { users } = ctx.db

    return users.find(user => {
      return user.id === author
    })
  },
  comments(parent, args, ctx, info) {
    const { comments } = ctx.db

    return comments.filter(comment => {
      return comment.id === parent.id
    })
  }
}
