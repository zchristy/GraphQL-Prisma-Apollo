export const User = {
  posts(parent, args, ctx, info) {
    const { posts } = ctx.db

    return posts.filter(post => {
      return post.author === parent.id
    })
  },
  comments(parent, args, ctx, info) {
    const { comments } = ctx.db

    return comments.filter(comment => {
      return comment.id === parent.id
    })
  }
}
