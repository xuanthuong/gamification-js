/**
 * render index page for action /
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getIndex = (req, res) => {
  if (req.user) {
    const model = {
      title: 'Work Result'
    };
    res.render('work-result/index', model);
  } else {
    res.render('auth/signin/index', {
      title: 'Sign In'
    });
  }
};

module.exports = {
  getIndex,
};