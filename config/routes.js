// load routes
module.exports = (app) => {
  app.use('/api/auth', require('../routes/auth'));

  app.use('/api/user', require('../routes/user'));

  app.use('/api/address', require('../routes/address'));

  app.use('/api/event', require('../routes/event'));

  app.use('/api/misc', require('../routes/misc'));

  app.use('/api/bookmark', require('../routes/bookmark'));

  app.use('/api/chat', require('../routes/chat'));

  if (process.env.ENVLOCAL && process.env.ENVLOCAL === 'local') {
    //console.log('local app');
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  }
};
