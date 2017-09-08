/**
 * render index page for action /
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getIndex = (req, res) => {
  if (req.user) {
    const model = {
      title: 'Tic Board'
    };
    res.render('tic-board/index', model);
  } else {
    res.render('auth/signin/index', {
      title: 'Sign In'
    });
  }
};

module.exports = {
  getIndex,
};