import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Mutation = {
  async createUser(parent, args, ctx, info) {
    const { prisma } = ctx

    if(args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer')
    }

    const password = await bcrypt.hash(args.data.password, 10)

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
      token: jwt.sign({userId: user.id}, 'thisisasecret')
    }

  },
  async updateUser(parent, args, ctx, info) {
    const { prisma } = ctx

    const userExists = await prisma.exists.User({id: args.id})

    if(!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

  },
  async deleteUser(parent, args, ctx, info) {
    const { prisma } = ctx

    const userExists = await prisma.exists.User({id: args.id})

    if(!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.deleteUser({
      where: {
        id: args.id
      }
    }, info)

  },
  async createPost(parent, args, ctx, info) {
    const { prisma } = ctx

    const userExists = await prisma.exists.User({id: args.data.author})

    if(!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.createPost({
      data: {
        ...args.data,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)

  },
  async deletePost(parent, args, ctx, info) {
    const { prisma } = ctx

    const postExists = await prisma.exists.Post({id: args.id})

    if(!postExists) {
      throw new Error('Post not found')
    }

    return prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)

  },
  async updatePost(parent, args, ctx, info) {
    const { prisma } = ctx

    const postExists = await prisma.exists.Post({id: args.id})

    if(!postExists) {
      throw new Error('Post not found')
    }

    return prisma.mutation.updatePost({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

  },
  async createComment(parent, args, ctx, info) {
    const { prisma } = ctx

    const userExists = await prisma.exists.User({id: args.data.author})

    if(!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.createComment({
      data: {
        ...args.data,
        author: {
          connect: {
            id: args.data.author
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
  async deleteComment(parent, args, ctx, info) {
    const { prisma } = ctx

    const commentExists = await prisma.exists.Comment({id: args.id})

    if(!commentExists) {
      throw new Error('Comment not found')
    }

    return prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)

  },
  async updateComment(parent, args, ctx, info) {
    const { prisma } = ctx

    const commentExists = await prisma.exists.Comment({id: args.id})

    if(!commentExists) {
      throw new Error('Comment not found')
    }

    return prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

  },
}
