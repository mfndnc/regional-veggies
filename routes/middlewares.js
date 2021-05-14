const loginCheck = () => {
  return (req, res, next) => {
    // check if the user is logged in
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(404).json({ message: 'You need to be logged in' });
    }
  };
};

module.exports = {
  loginCheck,
};
