/**
 * render index page for action /
 * 
 * @param {*} req 
 * @param {*} res 
 */
// const fs = require('fs');
// let animation = JSON.parse(fs.readFileSync(__dirname + '/helpers/animation.json', 'utf8'));

const getIndex = (req, res) => {
  if (req.user) {
    const model = {
      title: 'Notice Hole Result'
    };
    res.render('notice-hole-result/index', model);
  } else {
    res.render('auth/signin/index', {
      title: 'Sign In'
    });
  }
}

module.exports = {
  getIndex
};