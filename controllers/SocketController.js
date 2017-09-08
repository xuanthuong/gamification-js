const ioclient = require('socket.io-client');
const app = require('express')();

const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    socket.on('holeDetail', (msg) => {
        console.log(msg);
        io.emit('holeDetail', msg);
    });
    socket.on('hole', (msg) => {
        console.log(msg);
        io.emit('hole', msg);
    });
});
http.listen(12355);

const socketApi = (req, res, next) => {
    let socket = ioclient.connect('https://gamification-pm.herokuapp.com:12355', { reconnect: true });
    socket.on('connect', function (socket) {
        console.log('Connected!');
    });
    socket.emit('hole', req.body.hole);
    socket.emit('holeDetail', req.body.holeDetail);
    res.status(200).json("Ok");
}

module.exports = {
    socketApi
}