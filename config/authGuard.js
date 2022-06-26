// ensure authentication for authenticated users or guest users
//Implemented the module to protect all the routes from breaching directly
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    //check whether request is authenticated from passport or not
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/user/login');
    }
    next();
  }
};