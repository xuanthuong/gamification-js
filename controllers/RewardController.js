/**
 * render index page for action /
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getIndex = (req, res) => {
  if (req.user) {
    const model = {
      title: 'Reward'
    };
    res.render('reward/index', model);
  } else {
    res.render('auth/signin/index', {
      title: 'Sign In'
    });
  }
};

module.exports = {
  getIndex,
};