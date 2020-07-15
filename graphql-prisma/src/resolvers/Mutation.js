import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

export const Mutation = {
// ===========================================================
// USER - LOGIN
  async login(parent, args, ctx, info) {
    const { prisma } = ctx

    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })

    if(!user) {
      throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password)

    if(!isMatch) {
      throw new Error('Unable to login')
    }

    return {
      user,
      token: generateToken(user.id)
    }

  },
// ===========================================================
// USER - CREATE
  async createUser(parent, args, ctx, info) {
    const { prisma } = ctx

    const password = await hashPassword(args.data.password)

    const emailTaken = await prisma.exists.User({email: args.data.email})

    if(emailTaken) {
      throw new Error('Email is taken.')
    }

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }

  },
// ===========================================================
// USER - UPDATE
  async updateUser(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    // update and hash updated password.
    if(typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: args.data
    }, info)

  },
// ===========================================================
// USER - DELETE
  async deleteUser(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info)

  },
// ===========================================================
// POST - CREATE
  async createPost(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    return prisma.mutation.createPost({
      data: {
        ...args.data,
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info)

  },
// ===========================================================
// POST - DELETE
  async deletePost(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    })

    if(!postExists) {
      throw new Error('Unable to delete post')
    }

    return prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)

  },
// ===========================================================
// POST - UPDATE
  async updatePost(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    })

    const isPublished = await prisma.exists.Post({
      id: args.id,
      published: true
    })

    if(!postExists) {
      throw new Error('Unable to update post')
    }

    // deleteing all comments of a post when a post is changed from published to un-published.
    if(isPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id
          }
        }
      })
    }

    return prisma.mutation.updatePost({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

  },
// ===========================================================
// COMMENT - CREATE
  async createComment(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    // does post exist?
    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true
    })

    if(!postExists) {
      throw new Error('Post Not Found')
    }

    return prisma.mutation.createComment({
      data: {
        ...args.data,
        author: {
          connect: {
            id: userId
          }
        },
        post: {
          connect: {
            id: args.data.post
          }
        }
      }
    }, info)

  },
// ===========================================================
// COMMENT - DELETE
  async deleteComment(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })

    if(!commentExists) {
      throw new Error('Unable to delete Comment')
    }

    return prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)

  },
// ===========================================================
// COMMENT - UPDATE
  async updateComment(parent, args, ctx, info) {
    const { prisma, request } = ctx
    // Authentication helper function
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })

    if(!commentExists) {
      throw new Error('Unable to update Comment')
    }

    return prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

  },
}
