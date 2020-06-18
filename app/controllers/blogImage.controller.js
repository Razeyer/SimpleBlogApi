"use strict"
const BlogImageModel = require('../models/blogImage.model');
const moment = require('moment');
const mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink)

// create a new blog image
exports.blogImageAdd = (req, res) => {
  console.log(req.file);
  const body = {
      title: req.body.title,
      filename: `${req.file.filename}`
  };
  const NewBlogImage = new BlogImageModel(body);
  NewBlogImage.save((err, blogImage) => {
    if(err) {
      return res.status(422).json({
        msg: 'Server encountered an error adding image.',
        error: err
      });
    }
    else {
      return res.status(200).json({
        msg: 'The image is successfully added.',
        blogImageAdd: blogImage
      });
    }
  });
};

// get blog image details by id
exports.blogImageDetails = (req, res) => {
  BlogImageModel.where({ '_id': req.params.id }).countDocuments(function(err, count) {
    if (count > 0) {
      BlogImageModel.findById(req.params.id, function (err, blogImage) {
        if (err) return res.status(422).json({
          msg: 'Blog Image does not exist.'
        });
        let ret = JSON.parse(JSON.stringify(blogImage));
        return res.status(200).json({
          blogImageDetails: {
            ...ret,
            imageUrl: `${process.env.BASE_URL}/${ret.filename}`
          }
        });
      })
    } else return res.status(404).json();
  });
};

// get blog image details list
exports.blogImageList = (req, res) => {
  let query = {
    title: {'$regex': req.query.title || ''},
    filename: {'$regex': req.query.filename || ''},
    created: {
      $gte: moment(req.query.startDate),
      $lt: moment(req.query.endDate),
    },
  };
  BlogImageModel.find(query, function (err, blogImage) {
    let ret = JSON.parse(JSON.stringify(blogImage));
    let data = []
    for (var i in ret) {
      data[i] = {
        ...ret[i],
        imageUrl: `${process.env.BASE_URL}/${ret[i].filename}`
      }
    }
    return res.status(200).json(data);
  })
};

// update blog image details
exports.blogImageUpdate = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(422).json({
    msg: 'Invalid Id.',
  });
  BlogImageModel.where({ '_id': req.params.id }).countDocuments(function(err, count) {
    if (count > 0) {
      let oldFile = '';
      BlogImageModel.findById(req.params.id, function (err, blogImage) {
        oldFile = blogImage.filename;
      })
      BlogImageModel.findByIdAndUpdate(req.params.id, {
        $set: {
          title: req.body.title,
          filename: `${req.file.filename}`,
          updated: moment.utc().format()
        }}, async function (err, blogImage) {
          if (err) {
            return res.status(422).json({
              msg: 'Server encountered an error updating a blog image details.',
              error: err
            });
          }
          else {
            if (oldFile !== req.file.filename) await unlinkAsync('./app/images/' + oldFile);
            return res.status(200).json({
              msg: 'The image is successfully updated.'
            });
          }
      });
    } else return res.status(404).json();
  });
};

// delete blog image by id
exports.blogImageDelete = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(422).json({
    msg: 'Invalid Id.',
  });
  let file = '';
  BlogImageModel.where({ '_id': req.params.id }).countDocuments(function(err, count) {
    if (count > 0) {
      BlogImageModel.findById(req.params.id, function (err, blogImage) {
        file = blogImage.filename;
      })
      BlogImageModel.findByIdAndRemove(req.params.id, async function (err, blogImage) {
        console.log(err)
          if (err) {
            return res.status(422).json({
              msg: 'Server encountered an error deleting a blog image details.',
              error: err
            });
          }
          else {
            await unlinkAsync('./app/images/' + file);
            return res.status(200).json({
              msg: 'The image is successfully deleted.'
            });
          }
      });
    } else return res.status(404).json();
  });
};