const express = require('express');;
let upload = require('./utils/fileUploader');
const BlogImageController = require('./controllers/blogImage.controller');
module.exports = route => {
  // route groups
  const apiRoutes = express.Router();

  // url for all API routes
  route.use('/api', apiRoutes);

  // middleware for apiRoutes

  // create a new blog image
  apiRoutes.post('/blogImage/add', upload.single('image'), (req, res) => { 
    BlogImageController.blogImageAdd(req, res);
});

    // get blog image details List
    apiRoutes.get('/blogImage/lists/:title?/:filename?/:startDate?/:endDate?', BlogImageController.blogImageList);

    // get blog image details by id
    apiRoutes.get('/blogImage/:id', BlogImageController.blogImageDetails);

    // update blog image details by id
    apiRoutes.put('/blogImage/update/:id', upload.single('image'), (req, res) => {
        BlogImageController.blogImageUpdate(req, res);
  });

  // delete blog image by id
  apiRoutes.delete('/blogImage/delete/:id', BlogImageController.blogImageDelete);

    route.use('/health', (req, res) => {
	const response = 'Ok';
	res.body = `${JSON.stringify(response || '')}`;
	res.status(200).send(response);
});

route.all('*', (req, res) => {
	res.status(400).send('Invalid request');
});
};