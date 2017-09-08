window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            holeList: [],
            shotTable: []
        }
    },
    mounted() {
        this.getSocketData();
    },
    methods: {
        showpicture(position, id) {
            switch (position) {
                case 1:
                    $("#imgLeft").append("<img src=\"/assets/img/notice-hole-result/golf532.jpg\">");
                    break;
                case 2:
                    $("#imgRight").append("<img src=\"/assets/img/notice-hole-result/golf342.jpg\">");
                    break;
            }
        },
        getSocketData() {
            let socket = io('https://gamification-pm.herokuapp.com');
            socket.on('hole', (msg) => {
                let dataArr = [];
                msg.forEach((element) => {
                    let i = (this.holeList == undefined ? 0 : this.holeList.length) + 1;
                    let obj = {
                        id: i,
                        HOLE_TP: element.HOLE_TP,
                        TTL_DIST_NO: element.TTL_DIST_NO,
                        SCRE_NO: element.SCRE_NO,
                        HOLE_DT: element.HOLE_DT
                    }
                    dataArr.push(obj);
                    if (this.holeList == undefined) {
                        this.holeList = dataArr;
                    } else {
                        this.holeList.push(obj);
                    }
                });
            });
            socket.on('holeDetail', (msg) => {
                this.shotTable = msg;
            });
        },
        tableRightClick(par) {
            $("#imgRight").html('');
            $("#imgRight").append("<img src=\"/assets/img/notice-hole-result/" + par + ".jpg\">");
        },
        tableLeftClick(par, action, toLocation) {
            $.getJSON("/animation.json", (data) => {
                $("#imgLeft").html('');
                let image = data[par][action][toLocation];
                if (image) {
                    $("#imgLeft").append("<img src=\"/assets/img/test-golf-game/" + image + "\">");
                } else {
                    $("#imgLeft").html("");
                }
            });

        }
    }
});