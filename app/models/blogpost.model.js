const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// BlogPost Schema
const BlogPostSchema = mongoose.Schema({
    url: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    tags: [String],
    created: {
        type: Date,
        default: moment.utc().format()
    },
    updated: {
      type: Date
    }
  });
  module.exports = mongoose.model('BlogPost', BlogPostSchema);