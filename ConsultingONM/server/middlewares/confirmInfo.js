module.exports = (server, app) => {
  server.get('/management', (req, res) => {
    if (!req.query.admin_id || !req.query.b2b_seq) {
      return app.render(req, res, '/');
    } else {
      return app.render(req, res, '/management', req.query);
    }
  });

  server.get('/callhistory', (req, res) => {
    if (!req.query.admin_id || !req.query.b2b_seq) {
      return app.render(req, res, '/');
    } else {
      return app.render(req, res, '/callhistory', req.query);
    }
  });

  server.get('/workhistory', (req, res) => {
    if (!req.query.admin_id || !req.query.b2b_seq) {
      return app.render(req, res, '/');
    } else {
      return app.render(req, res, '/workhistory', req.query);
    }
  });

  server.get('/represent', (req, res) => {
    if (!req.query.admin_id || !req.query.b2b_seq) {
      return app.render(req, res, '/');
    } else {
      return app.render(req, res, '/represent', req.query);
    }
  });
};
