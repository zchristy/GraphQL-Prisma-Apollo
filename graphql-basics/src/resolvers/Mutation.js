import { v4 as uuidv4 } from 'uuid'

export const Mutation = {
  createUser(parent, args, ctx, info) {
    const { users } = ctx.db

    const emailTaken = users.some(user => {
      return user.email === args.data.email
    })

    if(emailTaken) {
      throw new Error('Email is taken.')
    }

    const user = {
      id: uuidv4(),
      ...args.data
    }

    users.push(user)

    return user
  },
  updateUser(parent, args, ctx, info) {
    const { users } = ctx.db
    const { id, data } = args

    const user = users.find(user => {
      return user.id === id
    })

    if(!user) {
      throw new Error('User not found')
    }

    if(typeof data.email === 'string') {
      const emailTaken = users.some(user => {
        return user.email === data.email
      })

      if(emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if(typeof data.name === 'string') {
      user.name = data.name
    }

    if(typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  deleteUser(parent, args, ctx, info) {
    const { users, comments, posts } = ctx.db

    const userIndex = users.findIndex(user => {
      return user.id === args.id
    })

    if(userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUsers = users.splice(userIndex, 1)

    posts = posts.filter(post => {
      const match = post.author === args.id

      if(match) {
        comments = comments.filter(comment => {
          return comment.post !== post.id
        })
      }

      return !match
    })

    comments = comments.filter(comment => {
      return comment.author !== args.id
    })

    return deletedUsers[0]
  },
  createPost(parent, args, ctx, info) {
    const { posts, users } = ctx.db

    const userExists = users.some(user => {
      return user.id === args.data.author
    })

    if(!userExists) {
      throw new Error('User not found')
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }

    posts.push(post)

    if(args.data.published) {
      ctx.pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }

    return post
  },
  deletePost(parent, args, ctx, info) {
    const { db, pubsub } = ctx
    const postIndex = db.posts.findIndex(post => post.id === args.id)

    if(postIndex === -1) {
      throw new Error('Post not found')
    }

    const deletedPosts = db.posts.splice(postIndex, 1)

    db.comment = db.comments.filter(comment => comment.post !== args.id)

    if(deletedPosts[0].published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPosts[0]
        }
      })
    }

    return deletedPosts[0]
  },
  updatePost(parent, args, ctx, info) {
    const { db, pubsub } = ctx
    const { id, data } = args

    const post = db.posts.find(post => post.id === id)
    const originalPost = { ...post }

    if(!post) {
      throw new Error('Post not found')
    }

    if(typeof data.title === 'string') {
      post.title = data.title
    }

    if(typeof data.body === 'string') {
      post.body = data.body
    }

    if(typeof data.published === 'boolean') {
      post.published = data.published

      if(originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        })
      } else if(!originalPost.published && post.published) {
        console.log(post)
          pubsub.publish('post', {
            post: {
              mutation: 'CREATED',
              data: post
            }
          })
      }
    } else if(post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'UPDATED',
            data: post
          }
        })
    }

    return post
  },
  createComment(parent, args, ctx, info) {
    const { db, pubsub } = ctx

    const userExists = db.users.filter(user => {
      return user.id === args.data.author
    })

    const postExists = db.posts.filter(post => {
      return post.id === args.data.post
    })

    if(!userExists.length || !postExists.length || postExists[0].published === false) {
      throw new Error('Comment can not be created')
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment_${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    })

    return comment
  },
  deleteComment(parent, args, ctx, info) {
    const { db, pubsub } = ctx
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id)

    if(commentIndex === -1) {
      throw new Error('Comment not found')
    }

    const deletedComments = db.comments.splice(commentIndex, 1)

    if(deletedComments[0]) {
      pubsub.publish(`comment_${args.id}`, {
        comment: {
          mutation: 'DELETED',
          data: deletedComments[0]
        }
      })
    }

    return deletedComments[0]
  },
  updateComment(parent, args, ctx, info) {
    const { db, pubsub } = ctx
    const { id, data, postId } = args

    const comment = db.comments.find(comment => comment.id === id)
    const originalComment = { ...comment }

    if(!comment) {
      throw new Error('Comment not found')
    }

    if(typeof data.text === 'string') {
      comment.text = data.text

      pubsub.publish(`comment_${postId}`, {
        comment: {
          mutation: 'UPDATED',
          data: comment
        }
      })
    }

    return comment
  },
}
