export const Query = {
  users(parent, args, ctx, info) {
    const { query } = args
    const { users } = ctx.db
    if(query) {
      return users.filter(user => {
        return user.name.toLowerCase().includes(query.toLowerCase())
      })
    } else {
      return users
    }
  },
  posts(parent, args, ctx, info) {
    const { query } = args
    const { posts } = ctx.db

    if(query) {
      return posts.filter(post => {
        return post.title.toLowerCase().includes(query.toLowerCase())
      })
    } else {
      return posts
    }
  },
  comments(parent, args, ctx, info) {
    const { query } = args
    const { comments } = ctx.db

    if(query) {
      return comments.filter(comment => {
        return comment.text.toLowerCase().includes(query.toLowerCase())
      })
    } else {
      return comments
    }
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
