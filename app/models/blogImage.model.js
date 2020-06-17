const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

// BlogImage Schema
const BlogImageSchema = mongoose.Schema({
    title: {
      type: String,
      max: 50,
      required: true,
      unique: true
    },
    filename: {
        type: String,
        max: 100,
        unique: true,
        index: true
      },
    created: {
        type: Date,
        default: moment.utc().format()
    },
    updated: {
      type: Date,
      default: null,
    }
});
  module.exports = mongoose.model('BlogImages', BlogImageSchema);