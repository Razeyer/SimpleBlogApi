const config = {
    port: process.env.PORT || 8080,
    db: 'mongodb://localhost/simpleblog',
    test_port: 4242,
    test_db: 'mongodb://localhost/simpleblog_test'
  }
  module.exports = config;