const Sequelize = require('sequelize');
const path = require('path');

var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}
//process.env.DATABASE_URI = 'mysql://gamification:123789@10.0.14.199:3306/gamification-fwd';
//process.env.DATABASE_URI = 'mysql://golf_user:123789@10.0.0.17/gamification';
process.env.DATABASE_URI = 'mysql://golf_user:123789@gmf-db.dounets.com/gamification';

const sequelize = new Sequelize(process.env.DATABASE_URI, opts);

const User = sequelize.import(path.join(__dirname, 'user.js'));
const GMF_CUMLT_FREQ_DISTR = sequelize.import(path.join(__dirname, 'gmf_cumlt_freq_distr.js'));

const db = {};
db.User = User;
db.GMF_CUMLT_FREQ_DISTR = GMF_CUMLT_FREQ_DISTR;

db.sequelize = sequelize;

module.exports = db