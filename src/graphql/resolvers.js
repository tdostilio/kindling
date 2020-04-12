const Post = require('../db/post')
const { ObjectId } = require('bson')
module.exports = {
  Query: {
    posts: async (parent, args) => {
      let posts
      try {
        posts = await Post.find()
      } catch (err) {
        throw err
      }
      return posts
    },
    post: async (parent, args) => {
      if (!args.id) {
        throw new Error(`Id is required arg`)
      }
      let post
      try {
        post = await Post.findById({ _id: ObjectId(args.id) })
      } catch (err) {
        throw err
      }
      return post
    },
  },
  Mutation: {
    createPost: async (parent, { title, desc, author }) => {
      let newPost
      try {
        newPost = await Post.createPost({ title, desc, author })
      } catch (e) {
        throw e
      }
      return newPost
    },
    updatePost: async (parent, args = {}) => {
      if (!args.id) {
        throw new Error(`Id is required arg`)
      }
      let post
      try {
        post = await Post.findOne({ _id: ObjectId(args.id) })
        if (!post) {
          throw new Error('Error finding post')
        }
        post = await post.updatePost(args)
      } catch (err) {
        throw err
      }
      return post
    },
  },
}
