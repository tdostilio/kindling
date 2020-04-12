const mongoose = require('mongoose')

let Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
})

Post.statics.createPost = async function ({ title, desc, author }) {
  if (!title || !desc || !author) {
    throw new Error('Missing required params')
  }
  const newPost = new Post({
    title,
    desc,
    author,
  })

  try {
    await newPost.save()
  } catch (e) {
    throw e
  }

  return newPost
}

Post.methods.updatePost = async function (params = {}) {
  if (!this) {
    throw new Error('Post not in context')
  }
  const safeFields = ['title', 'desc', 'author']
  for (let param in params) {
    if (safeFields.includes(param)) {
      this[param] = params[param]
    }
  }

  try {
    await this.save()
  } catch (err) {
    throw new Error('Error saving post')
  }

  return this
}

Post = mongoose.model('Post', Post)
module.exports = Post
